
# 14) Coding conventions & checklist cho dev trước khi code

* Readme + runbook per service.
* OpenAPI contract for any public endpoints before implementation.
* Unit tests >= 70% coverage for critical services (bao gồm threading và training logic).
* Lint + Prettier + TypeScript strict.
* Containerize service with Dockerfile.
* CI pipeline runs tests & builds image; pushes to registry on merge; thêm step test ML scripts.
