# 🔒 07-security - Tài liệu Bảo mật

> **Mục đích:** Đảm bảo hệ thống an toàn, tuân thủ standards  
> **Người phụ trách:** Security Engineer / Tech Lead  
> **Timeline:** Phase 4 (Week 19-20), enforce liên tục

---

## 📝 DANH SÁCH FILES (2 files)

| # | File | Owner | Time | Priority | Update Frequency |
|---|------|-------|------|----------|------------------|
| 1 | 01-Security-Guidelines.md | Security/Tech Lead | 3-4 days | 🔴 Critical | When threats change |
| 2 | 02-Compliance-GDPR.md | Legal + Tech Lead | 2-3 days | 🟠 High | Annually |

**Total:** 5-7 days (Phase 4)

---

## 📋 CHI TIẾT FILES

### **File 1: 01-Security-Guidelines.md** ⏳ TO DO
**Nội dung:** Security best practices & standards

**Sections bắt buộc:**
1. Introduction
   - Security principles: CIA (Confidentiality, Integrity, Availability)
   - Compliance targets: OWASP Top 10, SOC 2 readiness
   - Responsibility: Everyone's responsibility, not just security team
2. Authentication & Authorization
   - **OAuth 2.0 + OpenID Connect** for social login
   - **JWT tokens:** HMAC-SHA256, 1h expiry, secure httpOnly cookies
   - **Password policy:** Min 8 chars, complexity required, bcrypt hash (cost 10)
   - **MFA (optional):** TOTP for high-value accounts
   - **RBAC:** Roles (admin, owner, member, viewer), enforce at API Gateway
3. Data Protection
   - **Encryption at rest:** AES-256 for sensitive data (API keys, passwords)
   - **Encryption in transit:** TLS 1.3 mandatory (HTTPS only)
   - **Database encryption:** Column-level for PII (email, phone)
   - **Secrets management:** Kubernetes Secrets + Vault (recommended)
   - **API keys:** Never hardcode, rotate quarterly
4. Input Validation & Sanitization
   - **Validate all inputs:** Use DTO validation (class-validator)
   - **Sanitize outputs:** Prevent XSS (escape HTML)
   - **SQL injection prevention:** Use ORMs (TypeORM), parameterized queries
   - **File upload validation:** Check MIME type, size limit, virus scan
5. API Security
   - **Rate limiting:** 100 req/min per user (API Gateway)
   - **CORS:** Whitelist origins only (no `*`)
   - **API versioning:** /v1/, /v2/ (deprecate gracefully)
   - **Error messages:** Don't expose stack traces in production
6. Session Management
   - **Session timeout:** 1 hour inactivity
   - **Refresh token:** 7 days, rotate on use
   - **Logout:** Invalidate tokens server-side (blacklist)
   - **Concurrent sessions:** Limit to 3 devices per user
7. OWASP Top 10 Mitigation
   - **A01 Broken Access Control:** RBAC checks on every endpoint
   - **A02 Cryptographic Failures:** TLS 1.3, AES-256
   - **A03 Injection:** Parameterized queries, input validation
   - **A04 Insecure Design:** Security reviews in design phase
   - **A05 Security Misconfiguration:** Hardened configs, no defaults
   - **A06 Vulnerable Components:** Snyk scans, keep dependencies updated
   - **A07 Auth Failures:** Strong password policy, MFA option
   - **A08 Software Integrity:** Verify package checksums, signed releases
   - **A09 Logging Failures:** Centralized logging, audit trails
   - **A10 SSRF:** Validate URLs, whitelist domains
8. Security Testing
   - **SAST:** SonarQube for code analysis
   - **DAST:** OWASP ZAP for runtime scanning
   - **Dependency scanning:** Snyk in CI/CD (fail on critical/high)
   - **Penetration testing:** Annual external audit
9. Incident Response Plan
   - **Detection:** Monitoring alerts (Grafana, logs)
   - **Containment:** Isolate affected systems
   - **Eradication:** Patch vulnerability, rotate credentials
   - **Recovery:** Restore from backups if needed
   - **Lessons learned:** Post-mortem, update guidelines
10. Security Checklist (Pre-Production)
    - [ ] OWASP ZAP scan clean (no high/critical)
    - [ ] Snyk scan clean
    - [ ] Penetration test passed
    - [ ] TLS 1.3 enabled
    - [ ] Secrets rotated
    - [ ] API rate limiting tested
    - [ ] RBAC verified on all endpoints
    - [ ] Error messages sanitized (no stack traces)
    - [ ] Audit logs enabled
    - [ ] Incident response plan tested

**Checklist:**
- [ ] All OWASP Top 10 addressed
- [ ] Authentication/Authorization standards defined
- [ ] Data encryption (at rest + in transit) documented
- [ ] Security testing tools integrated (Snyk, OWASP ZAP)
- [ ] Incident response plan tested
- [ ] Pre-production checklist complete
- [ ] Team trained on security practices

---

### **File 2: 02-Compliance-GDPR.md** ⏳ TO DO
**Nội dung:** GDPR compliance & data privacy

**Sections bắt buộc:**
1. Introduction
   - Regulation: GDPR (EU) compliance
   - Scope: User data (email, phone, chat history, voice recordings)
   - Penalties: Up to €20M or 4% revenue (why we care!)
2. GDPR Principles
   - **Lawfulness:** User consent required for data processing
   - **Purpose limitation:** Only collect data for stated purposes
   - **Data minimization:** Collect only what's necessary
   - **Accuracy:** Keep data up-to-date
   - **Storage limitation:** Delete after 1 year inactive
   - **Integrity:** Secure data (encryption)
   - **Accountability:** Document compliance
3. User Rights (GDPR Articles)
   - **Right to access (Art. 15):** User can request their data
     - Implementation: `/api/users/me/data-export` endpoint
     - Format: JSON file with all user data
   - **Right to rectification (Art. 16):** User can correct data
     - Implementation: Profile edit functionality
   - **Right to erasure (Art. 17):** "Right to be forgotten"
     - Implementation: `/api/users/me/delete` endpoint
     - Process: Soft delete → 30 days grace → hard delete
   - **Right to data portability (Art. 20):** Export in machine-readable format
     - Implementation: JSON export with all conversations, projects
   - **Right to object (Art. 21):** User can object to processing
     - Implementation: Opt-out of analytics, marketing
4. Data Processing Activities
   - **User account data:** Email, phone, name (legal basis: contract)
   - **Chat history:** Messages, conversations (legal basis: contract)
   - **Voice recordings:** Audio files (legal basis: consent)
   - **Usage analytics:** Tokens, costs (legal basis: legitimate interest)
   - **Cookies:** Session, preferences (legal basis: consent)
5. Consent Management
   - **Explicit consent:** Checkbox for voice recording, analytics
   - **Granular consent:** Separate for each purpose
   - **Withdrawable:** User can revoke anytime
   - **Records:** Store consent timestamp, purpose
6. Data Retention Policy
   - **Active users:** Data retained indefinitely while active
   - **Inactive users:** >1 year no login → notify → delete after 30 days
   - **Deleted accounts:** 30-day grace period → permanent deletion
   - **Backup retention:** 30 days (separate from active data)
   - **Logs:** 30 days, then auto-purge
7. Data Breach Response
   - **Detection:** <24 hours via monitoring
   - **Assessment:** Determine scope, risk level
   - **Notification:**
     - Supervisory authority: Within 72 hours (GDPR Art. 33)
     - Affected users: Without undue delay (GDPR Art. 34)
   - **Documentation:** Breach register, response actions
8. Third-Party Processors
   - **OpenAI, Google Gemini:** Data Processing Agreements (DPA) required
   - **AWS/GCP:** DPA in place (standard cloud provider agreements)
   - **Subprocessor list:** Maintained & updated (inform users)
9. Privacy by Design
   - **Pseudonymization:** Use UUIDs, not real names in logs
   - **Encryption:** Default for all PII
   - **Access control:** Minimal privilege
   - **Data minimization:** Don't collect unnecessary data
10. Compliance Checklist
    - [ ] Privacy Policy published (link in footer)
    - [ ] Terms of Service include GDPR rights
    - [ ] Cookie consent banner implemented
    - [ ] Data export endpoint working
    - [ ] Account deletion endpoint working
    - [ ] Consent records stored
    - [ ] Data retention policy automated
    - [ ] DPAs with all processors signed
    - [ ] Breach response plan documented
    - [ ] Annual compliance audit scheduled

**Deliverables:**
- [ ] Privacy Policy document (legal review)
- [ ] Terms of Service document (legal review)
- [ ] Cookie Policy document
- [ ] Data Processing Agreement template
- [ ] User data export feature
- [ ] Account deletion feature

**Checklist:**
- [ ] All 8 GDPR principles addressed
- [ ] 5 user rights implemented (access, rectify, erase, port, object)
- [ ] Consent management system in place
- [ ] Data retention policy automated
- [ ] Breach response plan <72h notification
- [ ] DPAs signed with processors
- [ ] Privacy Policy + ToS reviewed by legal
- [ ] Compliance checklist completed

---

## ✅ WORKFLOW

```
Phase 4 - Week 19:
  Step 1: Tech Lead writes Security Guidelines
  Step 2: Run OWASP ZAP scan
  Step 3: Run Snyk scan
  Step 4: Fix high/critical vulnerabilities
          ↓
Week 20:
  Step 5: Legal + Tech Lead write GDPR Compliance doc
  Step 6: Implement data export/deletion endpoints
  Step 7: Legal review Privacy Policy & ToS
  Step 8: Penetration test (external vendor)
          ↓
Week 21-22:
  Fix penetration test findings
  Final security audit
  Sign-off before beta launch
```

---

## 👥 RACI

| Activity | Responsible | Accountable | Consulted | Informed |
|----------|-------------|-------------|-----------|----------|
| Security Guidelines | Tech Lead | Tech Lead | Security Expert | Dev Team |
| OWASP Scan | DevOps | Tech Lead | - | Dev Team |
| Penetration Test | External Vendor | PM | Tech Lead | All |
| GDPR Compliance | Tech Lead + Legal | Legal | Privacy Officer | All |
| Privacy Policy | Legal | Legal | Tech Lead | All |
| Data Export/Delete | Backend Lead | Tech Lead | Legal | All |

---

## 📊 PROGRESS

**Overall:** 🔴 0% Complete (0/2 files)

| File | Status | Progress | Blocker |
|------|--------|----------|---------|
| 01-Security-Guidelines.md | ⏳ To Do | 0% | Phase 4 not started |
| 02-Compliance-GDPR.md | ⏳ To Do | 0% | Need legal input |

**Next Action:** Start Week 19 (Phase 4)

---

## 🔄 SECURITY REVIEW SCHEDULE

**Weekly (During Development):**
- Snyk dependency scan (automated in CI)
- Review Dependabot alerts

**Per Milestone:**
- Code review with security checklist
- SAST scan (SonarQube)

**Phase 4 (Pre-Launch):**
- Full OWASP ZAP scan
- Penetration test (external)
- Security audit
- GDPR compliance review

**Post-Launch:**
- Quarterly security audits
- Annual penetration test
- Rotate secrets every 90 days
- Update dependencies monthly

---

## 💡 TIPS CHO SECURITY

### **Secure Coding:**
- Never trust user input (validate everything)
- Use parameterized queries (prevent SQL injection)
- Escape outputs (prevent XSS)
- Use HTTPS everywhere (no HTTP)
- Hash passwords with bcrypt (never plaintext)
- Use secure random for tokens (crypto.randomBytes)

### **Secret Management:**
- Never commit secrets to Git
- Use environment variables (.env)
- Use Kubernetes Secrets for production
- Rotate API keys quarterly
- Use different keys for dev/staging/prod

### **Incident Response:**
- Have a plan BEFORE incident happens
- Practice incident response (tabletop exercises)
- Keep contact list updated (who to call)
- Document everything during incident
- Post-mortem after resolution

### **GDPR Compliance:**
- Think "privacy by design" from day 1
- Minimize data collection (only what's needed)
- Get explicit consent (especially for voice)
- Make data export/deletion easy for users
- Document everything (compliance audits)

---

## 🔗 THAM CHIẾU

**Internal:**
- [Tech Stack](../02-architecture/04-Tech-Stack.md) - Security tools
- [CI/CD Pipeline](../04-development/05-CI-CD-Pipeline.md) - Security scans

**External - Security:**
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP ZAP](https://www.zaproxy.org/docs/)
- [Snyk Documentation](https://docs.snyk.io/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

**External - GDPR:**
- [GDPR Official Text](https://gdpr.eu/tag/gdpr/)
- [GDPR Checklist](https://gdpr.eu/checklist/)
- [ICO Guide (UK)](https://ico.org.uk/for-organisations/guide-to-data-protection/)
- [EDPB Guidelines](https://edpb.europa.eu/our-work-tools/general-guidance/guidelines-recommendations-best-practices_en)

**Tools:**
- OWASP ZAP: https://www.zaproxy.org/
- Snyk: https://snyk.io/
- SonarQube: https://www.sonarqube.org/

---

**Last Updated:** October 15, 2025  
**Maintained by:** Security Team / Tech Lead  
**Questions?** Contact security@chatai.com
