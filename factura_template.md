# Factura de Servicios - A-Dev

**N° Factura:** {{NUM_FACTURA}}
**Fecha:** {{FECHA}}
**Vencimiento:** {{VENCIMIENTO}}

---

## Datos del Emisor

**A-Dev / Agus**
{{DOMICILIO_EMISOR}}
CUIT/CUIL: {{CUIT_EMISOR}}
Email: {{EMAIL_EMISOR}}
Tel: {{TELEFONO_EMISOR}}

---

## Datos del Contratante

**{{NOMBRE_CLIENTE}}**
{{DOMICILIO_CLIENTE}}
CUIT/CUIL: {{CUIT_CLIENTE}}
Email: {{EMAIL_CLIENTE}}
Tel: {{TELEFONO_CLIENTE}}

---

## Concepto

| N° | Descripción | Cantidad | Precio Unit. | Importe |
|----|-------------|----------|--------------|---------|
| 1 | {{DESCRIPCION_SERVICIO}} ({{TIPO_SERVICIO}}) | 1 | USD {{PRECIO_UNIT}} | USD {{IMPORTE_UNIT}} |
| 2 | (Detalle opcional) | | | |
| 3 | (Detalle opcional) | | | |

---

## Resumen

| Concepto | Importe |
|----------|---------|
| Subtotal (sin IVA/Responsable Inscripto) | USD {{SUBTOTAL}} |
| Impuestos (si corresponde) | USD {{IMPUESTO}} |
| **Total** | **USD {{TOTAL}}** |

---

## Forma de pago

- Transferencia bancaria / CUIT/CCI
- MercadoPago / Transferencia simple
- Efectivo (solo presencial)

**Observaciones:**
- La seña del 30% ya fue abonada en {{FECHA_SENA}} (Factura N° {{NUM_SENA}}).
- El saldo restante vence el {{VENCIMIENTO}}.
- Después del vencimiento, se aplicará un recargo del 2% mensual sobre el saldo impago.

---

## Medios de pago disponibles

- [ ] Transferencia CBU: {{CBU_EMISOR}}
- [ ] Alias MercadoPago: {{ALIAS_MERCADOPAGO}}
- [ ] Pago presencial (coordinar hora previa)

---

**Gracias por tu pago. Consultas: hola@a-dev.dev**

---

*Generada automáticamente el {{FECHA_ACTUAL}}. Este documento es parte del contrato firmado entre A-Dev y {{NOMBRE_CLIENTE}}.*