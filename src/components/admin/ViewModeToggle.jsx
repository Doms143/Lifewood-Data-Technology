import { AlignJustify, LayoutGrid } from 'lucide-react'

export default function ViewModeToggle({ value, onChange }) {
  return (
    <div className="inline-flex rounded-2xl border border-castleton/15 bg-[#f4f7f5] p-1">
      {[
        ['tiles', 'Tiles', LayoutGrid],
        ['content', 'Content', AlignJustify],
      ].map(([mode, label, Icon]) => {
        const isActive = value === mode
        return (
          <button
            key={mode}
            type="button"
            onClick={() => onChange(mode)}
            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
              isActive ? 'bg-castleton text-white shadow-sm' : 'text-castleton hover:bg-white'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        )
      })}
    </div>
  )
}
