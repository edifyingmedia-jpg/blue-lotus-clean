# TWIN runtime enforcement map

## 1. Purpose

This document maps **where** the TWIN contract is enforced in the Blue Lotus runtime lifecycle—so governance is **structural**, not “best effort.”

---

## 2. Contract artifacts and authority order

- **Contract text authority:** `docs/TWIN_PRIME_SYSTEM_CONTRACT.md`
- **Contract machine authority:** `docs/TWIN_PRIME_SYSTEM_CONTRACT.js`
- **Enforcement authority:** `docs/TWIN_CONTRACT_ENFORCEMENT_MODEL.md`

- **Runtime rule:** The runtime must treat `TWIN_PRIME_SYSTEM_CONTRACT.js` as the **binding policy object** for enforcement decisions.

---

## 3. Runtime lifecycle enforcement points

### 3.1 App boot

- **Contract load location:** Application startup (server boot for backend, app init for frontend—whichever owns session creation).
- **Enforcement point:** Before any TWIN session can be created.

- **Required outcomes:**
  - **Load:** Import the contract module.
  - **Validate:** Validate structure + version.
  - **Freeze:** Ensure the imported object is immutable (already frozen in module export).
  - **Fail closed:** If load/validate fails, TWIN cannot initialize.

---

### 3.2 Session initialization

- **Session classifier location:** The code path that creates a “TWIN session” (chat session, build session, or owner console session).
- **Enforcement point:** Immediately after authentication/identity is known, before any response generation.

- **Required outcomes:**
  - **Classify:** Determine `session_scope` (owner-only vs derivative).
  - **Bind profile:** Create an immutable `TWINProfile` from the contract + session scope.
  - **Lock tier:** Tier is fixed for the session; no escalation.

---

## 4. Policy gates and where they intercept

### 4.1 Replication gate

- **Intercepts:** Any attempt to instantiate Tier 0 (Prime) outside owner scope.
- **Placement:** The factory/constructor that creates a TWIN instance (the single entry point that returns a TWIN runtime object).

- **Hard rules enforced:**
  - **Prime instantiation:** Allowed only when `scope === owner_only`.
  - **Derivative escalation:** Forbidden.

---

### 4.2 Speech gate

- **Intercepts:** Any outbound TWIN message before it is returned to UI/API.
- **Placement:** The final “message emit” step (right before returning the assistant response).

- **Hard rules enforced:**
  - **Initiation triggers:** Only allow proactive initiation when contract triggers are satisfied.
  - **Silence:** Preserve silence as valid output (no forced filler).
  - **Derivative limits:** Block unsolicited ideation for non-Prime tiers.

---

### 4.3 Action gate

- **Intercepts:** Any request that would cause execution (CRUD writes, generation, deployment, file writes, project mutation, tool invocation).
- **Placement:** The single action dispatcher / command bus / backend action router—where “intent becomes execution.”

- **Hard rules enforced:**
  - **Owner approval:** Required for execution.
  - **No silent actions:** Any action without explicit approval is blocked.
  - **Approved intent only:** Execution must match the approved payload (no widening).

---

### 4.4 Memory gate

- **Intercepts:** All memory reads/writes (short-term, long-term, cross-project).
- **Placement:** The memory adapter layer (the only module allowed to touch memory stores).

- **Hard rules enforced:**
  - **Prime:** Short-term + long-term allowed; cross-project patterning allowed.
  - **Derivatives:** Project-scoped + session-limited only.
  - **Forbidden:** Derivative long-term personal memory and cross-project personal memory.

---

## 5. Physical separation requirements

- **Memory store separation:** Prime long-term memory must be physically separated from derivative memory stores.
- **Namespace separation:** Derivative memory must be keyed by `project_id` (and optionally `session_id`) to prevent bleed.
- **Prime exclusivity:** Prime memory must be keyed by `owner_id` and never shared with derivative instances.

---

## 6. Audit points

- **Gate decision logging:** Each gate may emit an auditable decision record.
- **Placement:** At each gate boundary (Replication, Speech, Action, Memory).
- **Rule:** No hidden bypass paths—every path to speech, action, or memory must pass through gates.

---

## 7. Failure behavior

- **Fail closed:** If contract load/validation fails, TWIN initialization halts.
- **No degraded mode:** No fallback “lite TWIN” behavior when enforcement fails.
- **Explicit surfacing:** Failures must be surfaced as explicit system errors (not silent behavior changes).

---

## 8. Single-entry-point rule

- **Invariant:** There must be exactly one entry point each for:
  - **TWIN instantiation**
  - **Outbound message emission**
  - **Action dispatch**
  - **Memory access**

This guarantees the gates cannot be bypassed.

---

## 9. End-to-end flow summary

1. **Boot:** Load + validate contract → fail closed if invalid  
2. **Session init:** Classify scope → bind immutable `TWINProfile` → lock tier  
3. **Runtime:**  
   - **Replication gate** at instantiation  
   - **Memory gate** at memory adapter  
   - **Action gate** at action dispatcher  
   - **Speech gate** at message emit  
4. **Audit:** Log gate decisions (optional but supported)

---

