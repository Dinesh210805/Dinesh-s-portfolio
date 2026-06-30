# GravitycARgo

[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.2+-000000?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Plotly](https://img.shields.io/badge/Plotly-3D%20Visualization-3F4F75?logo=plotly&logoColor=white)](https://plotly.com/)
[![Unity AR](https://img.shields.io/badge/Unity-AR%20Ready-6C4AB6?logo=unity&logoColor=white)](#ar-workflow)
[![Slack](https://img.shields.io/badge/Slack-Automation-4A154B?logo=slack&logoColor=white)](#slack-automation)

**GravitycARgo is a constraint-aware container loading optimizer that turns cargo data into a safer, denser packing plan with 3D and AR-ready visualization.**

It is built for logistics workflows where the plan must be practical, not just mathematically packed. The system considers dimensions, weight limits, fragility, stackability, load-bearing capacity, route temperature, report generation, and Unity AR export.

## At A Glance

| Question | Answer |
| --- | --- |
| What does it do? | Builds container loading plans from CSV/Excel cargo data. |
| How is it done? | Flask app + 3D bin-packing logic + genetic optimization + route/weather constraints + AR JSON export. |
| What is the impact? | Better space use, safer load plans, faster review, and clearer handoff from planner to loader. |

## Proof Points

These are sample outputs already generated in `container_plans/` and logs in `logs/container_packing.log`.

| Run | Constraint context | Result |
| --- | --- | --- |
| `container_plan_20260427_084723.json` | 40ft container, regular packing | **64/64 items packed**, **42.87% volume utilization**, **4,691 kg** total cargo, **0 unpacked items** |
| `container_plan_20260427_093444.json` | 40ft container, route temperature **33.5°C** | **56/64 items packed**, **27.88% volume utilization**, **3,291 kg** total cargo, **8 unpacked items explained** |
| Routing module | OSRM + Open-Meteo checkpoints | Calculates distance, duration, alternative routes, average/min/max temperature, humidity, and precipitation risk |
| Optimization controls | User-configurable weights | Supports **7 weighted objectives**: volume, stability, contact, balance, item count, temperature, and weight capacity |

## What It Does

- Optimizes cargo placement across **10 predefined container types** plus custom dimensions.
- Expands item quantities into actual packable units, then places each item with position, rotation, dimensions, and weight.
- Uses a genetic algorithm to search better loading orders and rotations.
- Validates packing against weight, dimensions, load-bearing, fragility, stackability, wall clearance, and route temperature.
- Generates interactive 3D visualization, downloadable reports, and JSON container plans.
- Serves the latest plan to a Unity AR client through a local/remote JSON server.
- Supports Slack Socket Mode commands for operational status and optimization workflows.

## Why It Matters

Bad loading plans cost money through wasted space, damaged cargo, rework, and unclear execution. GravitycARgo reduces that risk by producing a plan that is measurable, reviewable, and tied to real constraints.

The practical impact:

- **Space:** measures volume utilization and remaining volume for every plan.
- **Safety:** checks weight distribution, stability, load-bearing, and fragile item handling.
- **Cold-chain awareness:** flags temperature-sensitive items when route temperature falls outside their required range.
- **Execution:** exports visual and JSON plans so teams can inspect the load before work starts.

## System Flow

```text
CSV / Excel cargo data
        |
        v
Flask web app parses cargo, container, route, and fitness weights
        |
        v
Packing engine validates spaces, rotations, support, and constraints
        |
        v
Genetic optimizer improves sequence and rotation choices
        |
        v
3D visualization + report + Slack workflow + AR-ready JSON plan
```

## Technical Architecture

| Layer | Files | Responsibility |
| --- | --- | --- |
| Web app | `app_modular.py`, `templates/`, `static/` | Flask routes, uploads, dashboard, optimization UI, report views |
| Packing models | `optigenix_module/models/` | Item model, container model, space splitting, metrics, reporting, visualization |
| Optimization | `optigenix_module/optimization/` | Genetic algorithm, fallback packing, max-utilization scoring, temperature constraints |
| Route intelligence | `routing/` | OSRM route lookup, checkpoints, weather summaries, route temperature recommendations |
| AI support | `optigenix_module/utils/llm_connector.py` | Gemini connector for adaptive mutation and fitness-weight decisions |
| Automation | `integrations/`, `slack_socket_mode.py` | Slack Socket Mode commands and optimization workflow hooks |
| AR serving | `json_server.py`, `ar_server_manager.py`, `container_plans/` | Latest plan detection, JSON serving, Unity AR handoff |

## Optimization Details

GravitycARgo uses a custom genetic algorithm around a 3D packing evaluator.

| Mechanism | Implementation detail |
| --- | --- |
| Genome | Item sequence + rotation flag per item |
| Rotation search | **6 axis-aligned rotations** per item |
| Default population | **10 genomes** |
| Default generations | **8 generations** from the packer, with UI support for custom values such as **30 generations** |
| Mutation rates | Rotation **0.20**, swap **0.15**, subsequence **0.10** |
| Elitism | Preserves top **15%** of genomes |
| Selection | Tournament selection with size **3** |
| Crossover | Order crossover for item sequence, uniform crossover for rotations |
| Stagnation handling | Adapts mutation strategy after **5 stagnant generations** |
| LLM-assisted tuning | Can refresh fitness weights every **3 generations** when Gemini is configured |

Fitness scoring considers:

- Volume utilization
- Items packed ratio
- Stability score
- Contact ratio
- Weight balance
- Temperature constraint score
- Weight capacity compliance

## Constraint Handling

| Constraint | How it is handled |
| --- | --- |
| Container size | Rejects placements that exceed length, width, or height |
| Payload weight | Uses container max payload from `CONTAINER_TYPES` where available |
| Load-bearing | Prevents weak items from supporting unsafe weight above them |
| Fragility | Uses item fragility values to avoid unsafe stacking decisions |
| Stackability | Reads stackable/bundle-style fields from uploaded data |
| Stability | Scores support, contact, and center-of-gravity behavior |
| Temperature | Parses item ranges such as `2°C to 8°C` and compares them with route temperature |
| Wall exposure | Enforces a **30 cm wall buffer** for items that need insulation |
| Central placement | Prefers the central quarter of the container for temperature-sensitive cargo |
| Insulation | Rewards surrounding non-sensitive items, up to a **0.10** temperature bonus |

## Route And Weather Intelligence

The route module connects packing decisions to transport context:

- Geocodes source and destination locations.
- Uses OSRM to calculate route geometry, distance, duration, checkpoints, and alternatives.
- Uses Open-Meteo forecast data for checkpoint temperature, humidity, and precipitation probability.
- Produces route weather summaries with average, minimum, and maximum temperature.
- Recommends standard, temperature-controlled, heated, or refrigerated container handling based on route conditions.

## Tech Stack

| Area | Tools |
| --- | --- |
| Backend | Python, Flask, Flask-SocketIO, Flask-CORS, Gunicorn |
| Data | Pandas, NumPy, CSV/Excel templates |
| Optimization | Custom genetic algorithm, SciPy/scikit-learn dependencies available |
| Visualization | Plotly, Dash, Three.js assets |
| Routing | OSRM public routing service, polyline decoding, checkpoint generation |
| Weather | Open-Meteo forecast API |
| AI | Google Gemini via `google-generativeai` |
| Automation | Slack Socket Mode |
| Deployment | Dockerfile, `render.yaml`, `wsgi.py`, `runtime.txt` |

## Quick Start

```bash
git clone https://github.com/Dinesh210805/GravitycARgo_TGB.git
cd GravitycARgo_TGB
pip install -r requirements.txt
python app_modular.py
```

Open:

```text
http://localhost:5000
```

## Configuration

The app can run locally without optional integrations. Add these only when needed:

```bash
GEMINI_API_KEY=your_gemini_key
SLACK_BOT_TOKEN=xoxb-your_slack_bot_token
SLACK_APP_TOKEN=xapp-your_slack_app_token
SLACK_SIGNING_SECRET=your_slack_signing_secret
ROUTE_TEMPERATURE=25.0
```

Common runtime ports:

| Service | Default |
| --- | --- |
| Main Flask app | `5000` |
| AR JSON server | `8000` |
| Route temperature server | `5001` |

## Input Format

Cargo can be uploaded as CSV or Excel.

```csv
Name,Length,Width,Height,Weight,Quantity,Fragility,LoadBear,BoxingType,Bundle,Temperature Sensitivity
Electronics_Box,1.2,0.8,0.3,50,5,HIGH,500,BOX,YES,10°C to 35°C
Pharmaceuticals,0.6,0.4,0.3,15,3,HIGH,0,BOX,NO,2°C to 8°C
```

| Field | Meaning |
| --- | --- |
| `Name` | Cargo identifier |
| `Length`, `Width`, `Height` | Item dimensions in meters |
| `Weight` | Item weight in kilograms |
| `Quantity` | Number of identical units to pack |
| `Fragility` | `LOW`, `MEDIUM`, or `HIGH` |
| `LoadBear` | Supported load-bearing weight |
| `BoxingType` | Packaging type such as `BOX`, `CRATE`, `PALLET`, `DRUM`, `FRAME`, `CARTON` |
| `Bundle` | Whether the item can be grouped with similar cargo |
| `Temperature Sensitivity` | Temperature range such as `2°C to 8°C`, or `n/a` |

Sample inputs are in `input/`. Reusable templates are in `static/templates/`.

## Supported Containers

| Container | Dimensions in meters | Max payload |
| --- | ---: | ---: |
| Twenty-foot | 5.90 x 2.35 x 2.39 | 28,180 kg |
| Forty-foot | 12.00 x 2.35 x 2.39 | 28,800 kg |
| Forty-foot-HC | 12.00 x 2.35 x 2.69 | 28,560 kg |
| Forty-five-foot-HC | 13.55 x 2.35 x 2.69 | 27,600 kg |
| Reefer-20ft | 5.44 x 2.29 x 2.27 | 27,700 kg |
| Reefer-40ft | 11.56 x 2.29 x 2.27 | 29,000 kg |
| Open-Top-20ft | 5.90 x 2.35 x 2.39 | 28,180 kg |
| Open-Top-40ft | 12.00 x 2.35 x 2.39 | 27,700 kg |
| Flat-Rack-20ft | 6.06 x 2.44 x 2.44 | 27,940 kg |
| Flat-Rack-40ft | 12.19 x 2.44 x 2.44 | 39,340 kg |

Transport modes include road, sea, air, rail, multimodal, and custom workflows.

## API Surface

Core app routes:

| Route | Method | Purpose |
| --- | --- | --- |
| `/` | `GET` | Landing/start page |
| `/start` | `GET` | Main workflow entry |
| `/optimize` | `POST` | Run packing optimization |
| `/preview_csv` | `POST` | Preview uploaded cargo data |
| `/download_report` | `GET` | Download generated report |
| `/view_report` | `GET` | View generated report |
| `/visualization` | `GET` | 3D container visualization |
| `/dashboard` | `GET` | Dashboard view |
| `/api/container/stats` | `GET` | Container metrics |
| `/api/items/<item_name>` | `GET` | Item-level detail |
| `/status` | `GET` | Current container status |
| `/clear` | `POST` | Clear current container state |
| `/generate_alternative_plan` | `GET` | Generate another loading plan |
| `/health` | `GET` | App health check |

Route and temperature endpoints:

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/route/search_location` | `GET` | Geocode/search location |
| `/api/route/calculate` | `POST` | Calculate route, checkpoints, alternatives, and weather |
| `/api/calculate_route_temperature` | `POST` | Legacy route-temperature endpoint |

AR/container plan endpoints:

| Route | Method | Purpose |
| --- | --- | --- |
| `/start_json_server` | `POST` | Start AR JSON server |
| `/stop_json_server` | `POST` | Stop AR JSON server |
| `/check_json_server_status` | `GET` | Check AR server state |
| `/api/container_plan.json` | `GET` | Serve latest plan JSON |
| `/api/container_plans` | `GET` | List generated plans |
| `/api/container_plans/<filename>` | `GET` | Fetch a specific plan |
| `/download_ar_apk` | `GET` | Download packaged AR app |

## AR Workflow

GravitycARgo exports the latest packing plan as JSON so Unity can render the container in AR.

Included AR assets:

- `AR Gravity Cargo.unitypackage`
- `AR_OptigeniX_app/Optigenix AR app.apk`
- `AR_INTEGRATION_GUIDE.md`

Typical flow:

```text
Run optimization -> generate container_plan_*.json -> start JSON server -> Unity fetches latest plan -> AR render
```

## Slack Automation

Slack Socket Mode is used for operational workflows. The integration can report app/server status and trigger optimization flows from Slack once tokens are configured.

Relevant files:

- `slack_socket_mode.py`
- `integrations/slack_connector.py`
- `integrations/slack_optimization.py`

## Project Structure

```text
.
├── app_modular.py              # Main Flask application
├── optigenix_module/           # Packing engine, models, optimization, reporting
├── modules/                    # Legacy/supporting handlers, reports, visualization helpers
├── routing/                    # OSRM route and weather-aware temperature logic
├── integrations/               # Slack integration helpers
├── templates/                  # Flask HTML templates
├── static/                     # CSS, JS, templates, and visualization assets
├── input/                      # Sample cargo datasets
├── container_plans/            # Generated JSON packing plans
├── AR_OptigeniX_app/           # Android AR app artifact
├── tests/ and test_*.py        # Validation scripts
├── Dockerfile                  # Container deployment
├── render.yaml                 # Render deployment config
└── wsgi.py                     # Production WSGI entrypoint
```

## Testing

Focused validation scripts:

```bash
python quick_packing_test.py
python test_realistic_packing.py
python test_llm_logging.py
python test_llm_genetic.py
python test_genetic_algorithm_llm.py
```

Pytest:

```bash
pytest
```

## What This Project Demonstrates

GravitycARgo shows end-to-end engineering across optimization, backend APIs, data validation, route-aware constraints, reporting, visualization, AR integration, Slack automation, and deployability.

The design goal is simple: make a complex logistics decision easier to trust.
