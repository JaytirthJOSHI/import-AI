# Import AI — Import/Export Compliance Checker

## Overview:
This AI system is designed to analyze trade-related queries and check for compliance with import/export laws. It evaluates provided data against international trade regulations, country-specific restrictions, and licensing requirements.

## Key Compliance Factors:
1. **Legal Restrictions** – Identifies banned, restricted, or dual-use goods.
2. **Regulatory Requirements** – Checks necessary permits, licenses, or certifications.
3. **Tariffs and Duties** – Highlights customs duties or additional taxes.
4. **Country-Specific Rules** – Ensures compliance with both exporting and importing country laws.
5. **Documentation** – Reviews paperwork like **bills of lading, commercial invoices, certificates of origin**, etc.
6. **Sanctions and Trade Embargoes** – Flags trade restrictions imposed by governments or international bodies.

## Risk Categories:
- **✅ Compliant** – Meets all legal and regulatory requirements.
- **⚠️ Needs Review** – Some conditions need to be clarified or additional paperwork is required.
- **🚨 Non-Compliant** – Violates trade regulations or lacks proper approvals.

## Common Trade Compliance Issues:
### 🚨 **Restricted or Banned Goods**:
- **Example 1:** Exporting **semiconductors from the U.S. to China** without a BIS export license.
- **Example 2:** Importing **pharmaceuticals into the EU** without meeting EMA (European Medicines Agency) regulations.
- **Example 3:** Shipping **weapons or military-grade equipment** to embargoed countries.

### ⚠️ **Missing Permits or Certifications**:
- **Example 4:** Exporting **medical devices from India to the U.S.** without FDA approval.
- **Example 5:** Importing **agricultural products into Japan** without phytosanitary certification.
- **Example 6:** Trading **alcoholic beverages internationally** without proper excise tax documents.

### 🚨 **Sanctions & Trade Embargoes**:
- **Example 7:** Attempting to export **commercial goods to North Korea** (prohibited under UN sanctions).
- **Example 8:** Selling **high-tech AI software** to restricted companies on the U.S. Entity List.
- **Example 9:** Shipping **dual-use technology** (civilian/military use) without ITAR compliance.

### ⚠️ **Documentation Errors**:
- **Example 10:** Incomplete **certificate of origin** causing shipment delays.
- **Example 11:** Mismatched **invoice values** triggering customs audits.
- **Example 12:** Incorrect **tariff classification (HS Code)** leading to unexpected duties.

## How to Use:
- Provide trade details (e.g., item description, source & destination countries, trade purpose).
- Include any known legal restrictions or regulations.
- If necessary, attach documents for review.
- The AI will assess risks and provide recommendations.

## Important Considerations:
- Some regulations change frequently, so always verify with relevant authorities.
- Compliance rules vary by industry and product type.
- The system provides **guidance**, but final decisions should be based on official trade policies.

## Timestamp:
The current timestamp is automatically included in every request to ensure the latest compliance data is used. 