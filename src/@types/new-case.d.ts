type NewCase = {
  dadosDoPaciente: PacientFormData;
  tratarArco: string;
  restricao_de_movimento_dentario?: string[];
  attachments?: string[];
  relacao_antero_posterior: RelacaoAnteroPosterior;
  overjet: string;
  sobremordida: Sobremordida;
  linhaMedia: LinhaMedia;
  manejo_de_espaços: ManejoDeEspaços;
  informacoes_complementares: InformacoesComplementares;
  documentacao: Documentacao;
};

type PacientFormData = {
  nome_completo: string;
  genero: string;
  data_de_nascimento: string;
  avatar: string;
};

type RelacaoAnteroPosterior = {
  d: string;
  e: string;
  option: string;
  sub_options?: string[];
  observation?: string;
};

type Sobremordida = {
  option: string;
  sub_options?: string[];
  observation?: string;
};

type LinhaMedia = {
  option: string;
  sub_options?: string[];
  observation?: string;
};

type ManejoDeEspaços = {
  diastemas: {
    option: string;
    observation?: string;
  };
  apinhamento: {
    corrigir_superior: {
      expandir: string;
      vestibularizar: string;
      ipr_anterior: string;
      ipr_posterior_direito: string;
      ipr_posterior_esquerdo: string;
    };
    corrigir_inferior: {
      expandir: string;
      vestibularizar: string;
      ipr_anterior: string;
      ipr_posterior_direito: string;
      ipr_posterior_esquerdo: string;
    };
  };
  extracoes: {
    option: string;
    sub_options: string[];
  };
};

type InformacoesComplementares = {
  informacoes_a_serem_compartilhadas: string;
  terceiros_molares: string;
  contencoes: string;
};

type Documentacao = {
  fotos: {};
  radiografia: {};
  stls: {};
};
