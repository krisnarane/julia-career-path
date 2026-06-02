import type { Deadline, GoalCategory, GoalPriority, GoalStatus } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GoalModalProps {
  isOpen: boolean;
  goal: Deadline;
  onClose: () => void;
  onUpdate: (updated: Deadline) => void;
}

const CATEGORIES: GoalCategory[] = ["Backend", "Cloud", "Data Engineering", "DevOps", "Estudos"];
const PRIORITIES: GoalPriority[] = ["Alta", "Média", "Baixa"];
const STATUSES: GoalStatus[] = ["Planejado", "Em progresso", "Concluído"];

export function GoalModal({ isOpen, goal, onClose, onUpdate }: GoalModalProps) {
  const [formData, setFormData] = useState<Deadline>(goal);

  const handleChange = (field: keyof Deadline, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.titulo.trim()) {
      toast.error("Título é obrigatório");
      return;
    }
    if (!formData.dataPrazo) {
      toast.error("Data de prazo é obrigatória");
      return;
    }

    // Persistir em localStorage
    const stored = localStorage.getItem("deadlines");
    const deadlines: Deadline[] = stored ? JSON.parse(stored) : [];
    const index = deadlines.findIndex((d) => d.id === goal.id);
    if (index >= 0) {
      deadlines[index] = formData;
    } else {
      deadlines.push(formData);
    }
    localStorage.setItem("deadlines", JSON.stringify(deadlines));

    toast.success("Meta atualizada com sucesso!");
    onUpdate(formData);
  };

  const handleDelete = () => {
    if (!confirm("Tem certeza que deseja deletar esta meta?")) return;

    const stored = localStorage.getItem("deadlines");
    const deadlines: Deadline[] = stored ? JSON.parse(stored) : [];
    const filtered = deadlines.filter((d) => d.id !== goal.id);
    localStorage.setItem("deadlines", JSON.stringify(filtered));

    toast.success("Meta deletada com sucesso!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Meta</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Categoria */}
          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria</Label>
            <Select value={formData.categoria} onValueChange={(v) => handleChange("categoria", v as GoalCategory)}>
              <SelectTrigger id="categoria">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="titulo">Título *</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => handleChange("titulo", e.target.value)}
              placeholder="Ex: Dominar PySpark avançado"
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              placeholder="Descreva os detalhes da meta"
              rows={3}
            />
          </div>

          {/* Data de Prazo */}
          <div className="space-y-2">
            <Label htmlFor="dataPrazo">Data de Prazo *</Label>
            <Input
              id="dataPrazo"
              type="date"
              value={formData.dataPrazo}
              onChange={(e) => handleChange("dataPrazo", e.target.value)}
            />
          </div>

          {/* Prioridade */}
          <div className="space-y-2">
            <Label htmlFor="prioridade">Prioridade</Label>
            <Select value={formData.prioridade} onValueChange={(v) => handleChange("prioridade", v as GoalPriority)}>
              <SelectTrigger id="prioridade">
                <SelectValue placeholder="Selecione a prioridade" />
              </SelectTrigger>
              <SelectContent>
                {PRIORITIES.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(v) => handleChange("status", v as GoalStatus)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Progresso Manual */}
          <div className="space-y-2">
            <Label htmlFor="progresso">
              Progresso: {formData.progresso ?? 0}%
            </Label>
            <input
              id="progresso"
              type="range"
              min="0"
              max="100"
              step="5"
              value={formData.progresso ?? 0}
              onChange={(e) => handleChange("progresso", parseInt(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <p className="text-xs text-muted-foreground">
              Arraste para atualizar o progresso da meta (0-100%)
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2 justify-between">
          <Button variant="destructive" onClick={handleDelete} className="mr-auto">
            Deletar
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="gradient-primary text-white">
              Salvar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
