import { useState, type FormEvent } from 'react';
import type { Spot } from '../../lib/db';

export type SpotDraft = Omit<Spot, 'id' | 'createdAt' | 'updatedAt'>;

interface Props {
  initial?: Partial<SpotDraft> & { lat: number; lng: number };
  title?: string;
  onSubmit: (draft: SpotDraft) => void | Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export default function SpotForm({
  initial,
  title = 'Nuevo spot',
  onSubmit,
  onCancel,
  submitLabel = 'Guardar',
}: Props) {
  const [name, setName] = useState(initial?.name ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [access, setAccess] = useState(initial?.access ?? '');
  const [species, setSpecies] = useState((initial?.species ?? []).join(', '));
  const [tags, setTags] = useState((initial?.tags ?? []).join(', '));
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      await onSubmit({
        name: name.trim(),
        lat: initial!.lat,
        lng: initial!.lng,
        notes: notes.trim(),
        access: access.trim(),
        species: species
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        tags: tags
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <form className="modal" onSubmit={handleSubmit}>
        <h2>{title}</h2>
        <p className="muted">
          {initial!.lat.toFixed(5)}, {initial!.lng.toFixed(5)}
        </p>
        <div className="field">
          <label htmlFor="spot-name">Nombre</label>
          <input
            id="spot-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Ej. Costanera norte"
            autoFocus
          />
        </div>
        <div className="field">
          <label htmlFor="spot-species">Especies (separadas por coma)</label>
          <input
            id="spot-species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            placeholder="Pejerrey, Tararira"
          />
        </div>
        <div className="field">
          <label htmlFor="spot-access">Acceso</label>
          <input
            id="spot-access"
            value={access}
            onChange={(e) => setAccess(e.target.value)}
            placeholder="Estacionamiento, sendero, permiso…"
          />
        </div>
        <div className="field">
          <label htmlFor="spot-notes">Notas</label>
          <textarea
            id="spot-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Profundidades, señuelos, horarios…"
          />
        </div>
        <div className="field">
          <label htmlFor="spot-tags">Tags</label>
          <input
            id="spot-tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="laguna, muelle, noche"
          />
        </div>
        <div className="row" style={{ justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn" disabled={saving}>
            {saving ? 'Guardando…' : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
