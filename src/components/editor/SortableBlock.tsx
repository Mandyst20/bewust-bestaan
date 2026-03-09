import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PageBlock, blockLabels } from "@/lib/pageBlockTypes";
import { BlockRenderer } from "./BlockRenderer";
import { GripVertical, Trash2, Copy, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SortableBlockProps {
  block: PageBlock;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export function SortableBlock({
  block,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
}: SortableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative transition-all duration-150",
        isSelected
          ? "ring-2 ring-primary ring-offset-0 z-10"
          : "hover:ring-1 hover:ring-border",
        isDragging && "z-50 opacity-60 shadow-xl"
      )}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* ── Floating toolbar ── */}
      <div
        className={cn(
          "absolute -top-9 left-1/2 -translate-x-1/2 z-20 flex items-center gap-0.5 rounded-lg bg-foreground px-1.5 py-1 shadow-lg transition-all duration-150",
          isSelected ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto"
        )}
      >
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab rounded p-1 text-background/70 hover:text-background active:cursor-grabbing"
          title="Verslepen"
        >
          <GripVertical className="h-3.5 w-3.5" />
        </button>
        <span className="px-1.5 text-[11px] font-medium text-background/80 select-none">
          {blockLabels[block.type]}
        </span>
        <div className="mx-0.5 h-4 w-px bg-background/20" />
        {onMoveUp && (
          <button
            className="rounded p-1 text-background/70 hover:text-background"
            onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
            title="Omhoog"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
        )}
        {onMoveDown && (
          <button
            className="rounded p-1 text-background/70 hover:text-background"
            onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
            title="Omlaag"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          className="rounded p-1 text-background/70 hover:text-background"
          onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
          title="Dupliceren"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
        <button
          className="rounded p-1 text-destructive/80 hover:text-destructive"
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          title="Verwijderen"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ── Actual rendered block ── */}
      <BlockRenderer block={block} />
    </div>
  );
}
