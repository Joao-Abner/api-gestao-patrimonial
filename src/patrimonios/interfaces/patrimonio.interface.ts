export interface Patrimonio {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
  localizacao: string;
  observacao?: string;
  responsavel: string;
  status: 'ativo' | 'inativo' | 'manutencao';
}
