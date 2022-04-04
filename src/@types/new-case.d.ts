type NewCaseType = {
  id: string;
  date: Date;
  userId: string;
  userName: string;
  dados_do_paciente: DadosDoPacienteType;
  tratarArco: string;
  restricao_de_movimento_dentario: RestricaoDeMovimentoDentarioType;
  attachments: AttachmentsType;
  relacao_antero_posterior: RelacaoAnteroPosteriorType;
  overjet: string;
  sobremordida: SobremordidaType;
  linha_media: LinhaMedia;
  manejo_de_espaços: ManejoDeEspaçosType;
  additionalFields: InformacoesComplementaresType;
  documentacao: DocumentacaoType;
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
  superior?: {
    direita: string;
    esquerda: string;
  };
  inferior?: {
    direita: string;
    esquerda: string;
  };
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
  fotos: {
    perfil: string;
    frente: string;
    sorriso: string;
    arca_superior: string;
    arca_inferior: string;
    arca_esquerda: string;
    arca_direita: string;
    arca_frontal: string;
  };
  radiografia: {
    frente: string;
    perfil: string;
  };
  stls: {
    superior: string;
    inferior: string;
  };
};
