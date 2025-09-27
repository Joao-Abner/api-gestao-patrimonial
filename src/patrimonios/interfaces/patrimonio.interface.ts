import { LocalizacaoDto } from '../dto/localizacao.dto';
export interface Patrimonio {
  id: string;
  nome: string;
  numeroPatrimonio: number; // número do patrimônio usado como código de barras
  descricao: string;
  valor: number;
  localizacao: LocalizacaoDto; // Alterado de string para o nosso DTO
  observacao?: string;
  responsavel: string;
  status: 'ativo' | 'inativo' | 'manutencao';
}
