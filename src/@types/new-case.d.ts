type NewCase = {
  dadosDoPaciente: DadosDoPacienteType;
  tratarArco: string;
  restricao_de_movimento_dentario: RestricaoDeMovimentoDentario;
  attachments: AttachmentsType;
  relacao_antero_posterior: RelacaoAnteroPosterior;
  overjet: string;
  sobremordida: Sobremordida;
  linhaMedia: LinhaMedia;
  manejo_de_espaços: ManejoDeEspaços;
  informacoes_complementares: InformacoesComplementares;
  documentacao: Documentacao;
};

type DadosDoPacienteType = {
  nome_completo: string;
  genero: string;
  data_de_nascimento: string;
  avatar: string;
};

type RestricaoDeMovimentoDentarioType = {
  option: string;
  sub_options?: string[];
};

type AttachmentsType = {
  option: string;
  sub_options?: string[];
};

type RelacaoAnteroPosteriorType = {
  d: string;
  e: string;
  option: string;
  sub_options?: string[];
  observation?: string;
};

type SobremordidaType = {
  option: string;
  sub_options?: string[];
  observation?: string;
};

type LinhaMediaType = {
  option: string;
  sub_options?: string[];
  observation?: string;
};

type ManejoDeEspaçosType = {
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

type InformacoesComplementaresType = {
  informacoes_a_serem_compartilhadas: string;
  terceiros_molares: string;
  contencoes: string;
};

type DocumentacaoType = {
  fotos: {};
  radiografia: {};
  stls: {};
};
