import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PageBlock, blockLabels } from "@/lib/pageBlockTypes";
import { BlockRenderer } from "./BlockRenderer";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SortableBlockProps {
  block: PageBlock;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function SortableBlock({ block, isSelected, onSelect, onDelete }: SortableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative cursor-pointer border-2 transition-smooth",
        isSelected ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-border",
        isDragging && "z-50 opacity-70"
      )}
      onClick={onSelect}
    >
      {/* Toolbar */}
      <div className={cn(
        "absolute -top-8 left-0 z-10 flex items-center gap-1 rounded-t-lg bg-primary px-2 py-1 text-xs text-primary-foreground transition-smooth",
        isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )}>
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="h-3 w-3" />
        </button>
        <span>{blockLabels[block.type]}</span>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 h-5 w-5 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      <BlockRenderer block={block} />
    </div>
  );
}
