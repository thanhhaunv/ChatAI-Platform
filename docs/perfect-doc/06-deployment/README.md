# 🚀 06-deployment - Tài liệu Triển khai

> **Mục đích:** Hướng dẫn deploy hệ thống lên production  
> **Người phụ trách:** DevOps Engineer  
> **Timeline:** Phase 3 (Week 15-18), cập nhật liên tục

---

## 📝 DANH SÁCH FILES (3 files)

| # | File | Owner | Time | Priority | Update Frequency |
|---|------|-------|------|----------|------------------|
| 1 | 01-Deployment-Guide.md | DevOps | 3-4 days | 🔴 Critical | When infra changes |
| 2 | 02-Infrastructure-Setup.md | DevOps | 2-3 days | 🔴 Critical | Phase 3 start |
| 3 | 03-Monitoring-Logging.md | DevOps | 2-3 days | 🟠 High | Phase 3 |

**Total:** 7-10 days (Phase 3)

---

## 📋 CHI TIẾT FILES

### **File 1: 01-Deployment-Guide.md** ⏳ TO DO
**Nội dung:** Step-by-step deploy lên Kubernetes

**Sections bắt buộc:**
1. Introduction
   - Target environment: Kubernetes (AWS EKS / GCP GKE)
   - Deployment strategy: Blue-Green
   - Rollback capability: Yes
2. Prerequisites
   - K8s cluster provisioned (via Terraform)
   - kubectl installed & configured
   - Docker images built & pushed to registry
   - Secrets configured (API keys, DB credentials)
3. Deployment Steps
   
   **3.1 Build & Push Images**
   ```bash
   # Build all services
   cd services/api-gateway
   docker build -t chatai/api-gateway:v1.0.0 .
   docker push chatai/api-gateway:v1.0.0
   # Repeat for 8 services...
   ```
   
   **3.2 Apply K8s Manifests**
   ```bash
   # Create namespace
   kubectl create namespace chatai-prod
   
   # Apply configs
   kubectl apply -f infrastructure/k8s/configmaps/
   kubectl apply -f infrastructure/k8s/secrets/
   
   # Deploy databases
   kubectl apply -f infrastructure/k8s/deployments/postgres-statefulset.yaml
   kubectl apply -f infrastructure/k8s/deployments/redis-deployment.yaml
   
   # Deploy services
   kubectl apply -f infrastructure/k8s/deployments/
   kubectl apply -f infrastructure/k8s/services/
   
   # Apply ingress
   kubectl apply -f infrastructure/k8s/ingress.yaml
   ```
   
   **3.3 Verify Deployment**
   ```bash
   # Check pods
   kubectl get pods -n chatai-prod
   # All should be Running
   
   # Check services
   kubectl get svc -n chatai-prod
   
   # Check ingress
   kubectl get ingress -n chatai-prod
   ```
   
   **3.4 Run Migrations**
   ```bash
   kubectl exec -it <user-service-pod> -n chatai-prod -- npm run migration:run
   ```
   
   **3.5 Health Checks**
   ```bash
   curl https://api.chatai.com/health
   # Should return: {"status": "ok"}
   ```

4. Blue-Green Deployment Process
   - Deploy new version to "green" environment
   - Test green environment
   - Switch traffic from blue → green (update Ingress)
   - Keep blue as backup (1 hour)
   - Delete blue after confirmation
5. Rollback Procedure
   - Switch Ingress back to blue
   - OR: Deploy previous image version
   - Estimated time: <5 minutes
6. Post-Deployment Checklist
   - [ ] All pods running
   - [ ] Health checks passing
   - [ ] Monitoring dashboards show metrics
   - [ ] Logs flowing to ELK/Loki
   - [ ] Alerts configured & tested
   - [ ] SSL certificates valid
   - [ ] DNS pointing correctly
   - [ ] Load test passed (basic smoke test)
7. Troubleshooting
   - Pod CrashLoopBackOff: Check logs, env vars
   - ImagePullBackOff: Check registry credentials
   - Service unreachable: Check ingress, firewall rules
   - Database connection errors: Check secrets, network policies

**Checklist:**
- [ ] Step-by-step commands documented
- [ ] Blue-Green strategy explained
- [ ] Rollback tested & documented
- [ ] Post-deployment checklist complete
- [ ] Troubleshooting guide có common issues
- [ ] Verified on staging first

---

### **File 2: 02-Infrastructure-Setup.md** ⏳ TO DO
**Nội dung:** Setup infrastructure với Terraform

**Sections bắt buộc:**
1. Introduction
   - IaC tool: Terraform
   - Cloud provider: AWS (EKS) or GCP (GKE)
   - State backend: S3 + DynamoDB (AWS) or GCS (GCP)
2. Prerequisites
   - Terraform v1.5+ installed
   - AWS CLI / GCloud SDK configured
   - IAM permissions configured
3. Infrastructure Components
   - **VPC:** Isolated network (public + private subnets)
   - **K8s Cluster:** 3 nodes minimum (t3.medium or n1-standard-2)
   - **RDS/CloudSQL:** PostgreSQL 15 (multi-AZ)
   - **ElastiCache/Memorystore:** Redis cluster
   - **S3/GCS:** File storage bucket
   - **Load Balancer:** Application Load Balancer (AWS) / Load Balancer (GCP)
   - **IAM Roles:** Service accounts for K8s pods
4. Terraform Structure
   ```
   infrastructure/terraform/
   ├── main.tf           # Main resources
   ├── variables.tf      # Input variables
   ├── outputs.tf        # Output values
   ├── backend.tf        # State backend config
   ├── vpc.tf            # VPC resources
   ├── eks.tf / gke.tf   # K8s cluster
   ├── rds.tf            # Database
   ├── redis.tf          # Cache
   ├── s3.tf             # Storage
   └── iam.tf            # Roles & policies
   ```
5. Provisioning Steps
   ```bash
   cd infrastructure/terraform
   
   # Initialize
   terraform init
   
   # Plan
   terraform plan -out=tfplan
   
   # Review plan
   # Apply
   terraform apply tfplan
   
   # Outputs
   terraform output
   ```
6. Configuration Variables
   - `aws_region` / `gcp_region`: Deployment region
   - `cluster_name`: chatai-prod
   - `node_count`: 3
   - `instance_type`: t3.medium / n1-standard-2
   - `db_instance_class`: db.t3.medium
   - `db_allocated_storage`: 100GB
7. Cost Estimation
   - K8s nodes: 3 × $50/month = $150
   - RDS: $80/month
   - ElastiCache: $40/month
   - Load Balancer: $20/month
   - Data transfer: ~$50/month
   - **Total: ~$340/month** (estimate)
8. Destroy (Cleanup)
   ```bash
   terraform destroy
   # WARNING: Deletes all infrastructure!
   ```

**Checklist:**
- [ ] Terraform files tested & validated
- [ ] State backend configured
- [ ] All resources tagged properly
- [ ] Cost estimation documented
- [ ] IAM roles least-privilege
- [ ] Multi-AZ for high availability
- [ ] Backup strategy defined

---

### **File 3: 03-Monitoring-Logging.md** ⏳ TO DO
**Nội dung:** Setup monitoring & logging stack

**Sections bắt buộc:**
1. Introduction
   - Monitoring: Prometheus + Grafana
   - Logging: ELK Stack (Elasticsearch, Logstash, Kibana) OR Loki + Grafana
   - Alerting: Alertmanager → Slack/Email
2. Metrics Collection (Prometheus)
   
   **2.1 Install Prometheus**
   ```bash
   # Via Helm
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
   helm install prometheus prometheus-community/prometheus -n monitoring
   ```
   
   **2.2 Service Monitors**
   - Each service exposes `/metrics` endpoint
   - Prometheus scrapes every 30s
   
   **2.3 Key Metrics**
   - Request rate (req/s)
   - Error rate (%)
   - Response time (p50, p95, p99)
   - CPU/Memory usage per pod
   - Database connection pool
   - Queue depth (RabbitMQ/Redis)

3. Dashboards (Grafana)
   
   **3.1 Install Grafana**
   ```bash
   helm install grafana grafana/grafana -n monitoring
   ```
   
   **3.2 Pre-built Dashboards**
   - **System Overview:** All services health, request rates
   - **API Gateway:** Traffic, rate limits, errors
   - **Chat Service:** Message volume, streaming latency
   - **Database:** Connections, query time, slow queries
   - **Infrastructure:** Node CPU/Memory, pod restarts
   
   **3.3 Access**
   - URL: https://grafana.chatai.com
   - Default login: admin / <generated-password>

4. Logging (ELK / Loki)
   
   **4.1 Install ELK Stack** (OR Loki)
   ```bash
   # Elasticsearch
   helm install elasticsearch elastic/elasticsearch -n logging
   
   # Logstash (optional, can use Fluentd)
   # Kibana
   helm install kibana elastic/kibana -n logging
   ```
   
   **4.2 Log Aggregation**
   - All pods send logs to stdout/stderr
   - Fluentd/Fluent-bit collects logs
   - Logs indexed in Elasticsearch
   
   **4.3 Log Format**
   ```json
   {
     "timestamp": "2025-10-15T10:30:00Z",
     "level": "info",
     "service": "chat-service",
     "message": "Message sent successfully",
     "userId": "user-123",
     "conversationId": "conv-456",
     "latency": 250
   }
   ```
   
   **4.4 Log Retention**
   - Dev: 7 days
   - Staging: 14 days
   - Production: 30 days

5. Alerting (Alertmanager)
   
   **5.1 Alert Rules**
   - High error rate (>5% for 5 mins) → Slack #alerts
   - Service down (no metrics for 2 mins) → PagerDuty
   - High latency (p95 >5s for 10 mins) → Slack
   - Database connection pool exhausted → Email + Slack
   - Disk usage >80% → Email
   
   **5.2 Notification Channels**
   - Slack: #chatai-alerts webhook
   - Email: ops-team@chatai.com
   - PagerDuty: For critical alerts (P0)
   
   **5.3 Alert Configuration**
   ```yaml
   # prometheus-rules.yaml
   groups:
     - name: chatai-alerts
       rules:
         - alert: HighErrorRate
           expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
           for: 5m
           annotations:
             summary: "High error rate detected"
   ```

6. Tracing (Optional - Phase 2)
   - Tool: Jaeger
   - Distributed tracing across microservices
   - Identify bottlenecks

7. Health Checks
   - `/health` endpoint on all services
   - K8s liveness probe
   - K8s readiness probe
   ```yaml
   livenessProbe:
     httpGet:
       path: /health
       port: 3000
     initialDelaySeconds: 30
     periodSeconds: 10
   ```

**Checklist:**
- [ ] Prometheus + Grafana installed
- [ ] 5+ dashboards created
- [ ] ELK/Loki installed & tested
- [ ] Logs flowing from all services
- [ ] Alert rules configured (5+ rules)
- [ ] Slack/Email notifications tested
- [ ] Log retention policy set
- [ ] Health checks on all services

---

## ✅ WORKFLOW

```
Phase 3 - Week 15-16:
  Step 1: DevOps provisions infrastructure (Terraform)
  Step 2: DevOps writes Infrastructure-Setup.md
          ↓
  Step 3: DevOps sets up monitoring/logging
  Step 4: DevOps writes Monitoring-Logging.md
          ↓
Week 17-18:
  Step 5: DevOps writes Deployment-Guide.md
  Step 6: First deployment to staging
  Step 7: Test deployment process
  Step 8: Deploy to production
          ↓
Week 22:
  Beta launch with monitoring active
```

---

## 👥 RACI

| Activity | Responsible | Accountable | Consulted | Informed |
|----------|-------------|-------------|-----------|----------|
| Infrastructure Setup | DevOps | Tech Lead | PM | All Team |
| Deployment Guide | DevOps | DevOps | Dev Lead | Dev Team |
| Monitoring Setup | DevOps | Tech Lead | - | Dev Team |
| Production Deploy | DevOps | PM | Tech Lead | All Team |

---

## 📊 PROGRESS

**Overall:** 🔴 0% Complete (0/3 files)

| File | Status | Progress | Blocker |
|------|--------|----------|---------|
| 01-Deployment-Guide.md | ⏳ To Do | 0% | Waiting for K8s setup |
| 02-Infrastructure-Setup.md | ⏳ To Do | 0% | Phase 3 not started |
| 03-Monitoring-Logging.md | ⏳ To Do | 0% | Phase 3 not started |

**Next Action:** Start in Phase 3 (Week 15)

---

## 🔄 DEPLOYMENT SCHEDULE

**Staging Deployments:**
- Week 16: First deploy to staging
- Weekly: Deploy latest develop branch
- Before production: Full staging test

**Production Deployments:**
- Week 18: First production deploy (soft launch)
- Week 22: Beta launch
- Post-launch: Bi-weekly releases (every 2 weeks)

**Hotfix Deployments:**
- Critical bugs (P0): Deploy within 4 hours
- High bugs (P1): Deploy within 24 hours

---

## 💡 TIPS CHO DEVOPS

### **Before Deployment:**
- [ ] Test in staging first (identical to prod)
- [ ] Backup database before deploy
- [ ] Check monitoring dashboards (baseline)
- [ ] Notify team in #deployments channel

### **During Deployment:**
- [ ] Use Blue-Green (zero downtime)
- [ ] Monitor logs in real-time
- [ ] Watch error rates in Grafana
- [ ] Keep rollback plan ready

### **After Deployment:**
- [ ] Verify health checks passing
- [ ] Run smoke tests (critical paths)
- [ ] Monitor for 1 hour
- [ ] Update deployment log

### **Troubleshooting:**
- Check logs: `kubectl logs <pod> -n chatai-prod`
- Check events: `kubectl describe pod <pod> -n chatai-prod`
- Check metrics: Grafana dashboards
- Rollback if needed (fast!)

---

## 🔗 THAM CHIẾU

**Internal:**
- [System Architecture](../02-architecture/01-System-Architecture.md) - Deployment architecture
- [Tech Stack](../02-architecture/04-Tech-Stack.md) - Infrastructure choices
- [CI/CD Pipeline](../04-development/05-CI-CD-Pipeline.md) - Automated deployment

**External:**
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Terraform Documentation](https://www.terraform.io/docs)
- [Prometheus Guide](https://prometheus.io/docs/introduction/overview/)
- [Grafana Dashboards](https://grafana.com/grafana/dashboards/)
- [ELK Stack Guide](https://www.elastic.co/guide/)

**Tools:**
- Terraform Cloud: https://app.terraform.io
- K8s Dashboard: https://k8s.chatai.com
- Grafana: https://grafana.chatai.com
- Kibana: https://kibana.chatai.com

---

**Last Updated:** October 15, 2025  
**Maintained by:** DevOps Team  
**Questions?** Contact devops@chatai.com
