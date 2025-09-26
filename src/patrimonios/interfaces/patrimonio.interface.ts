export interface Patrimonio {
  id: string;
  nome: string;
  numeroPatrimonio: number; // número do patrimônio usado como código de barras
  descricao: string;
  valor: number;
  localizacao: string;
  observacao?: string;
  responsavel: string;
  status: 'ativo' | 'inativo' | 'manutencao';
}
