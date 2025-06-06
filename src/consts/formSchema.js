import {
  object,
  string,
  ref,
  mixed,
  array,
  boolean
} from 'yup';

export const email = object()
.shape({
  email: string()
    .label('E-mail')
    .email('E-mail inválido')
    .required('Preencha seu e-mail'),
});

export const autenticação = object()
.shape({
  email: string()
    .label('E-mail')
    .email('E-mail inválido')
    .required('Preencha seu e-mail'),
  password: string()
    .label('Senha')
    .required('Preencha sua senha'),
});

export const novoUsuario = object()
.shape({
  email: string()
    .label('E-mail')
    .email('E-mail inválido')
    .required('Preencha seu e-mail'),
  name: string()
    .label('Nome')
    .required('Obrigatório'),
  password: string()
    .label('Nova senha')
    .min(8, 'Senha deve conter no mínimo 8 caracteres')
    .required('Preencha sua senha'),
  password_confirmation: string()
    .label('Confirmar nova senha')
    .min(8, 'Senha deve conter no mínimo 8 caracteres')
    .oneOf([ref('password')], 'As senhas devem coincidir')
    .required('Preencha sua senha'),
});

export const banner = object()
.shape({
  link: string()
    .label('Link'),
  name: string()
    .label('Nome')
    .required('Obrigatório'),
  image: string()
    .label('Nome')
    .required('Obrigatório'),
});

export const noticia = object()
.shape({
  title: string()
    .label('Titulo')
    .required('Obrigatório'),
  slug: string()
    .label('Slug')
    .required('Obrigatório')
    .matches(/^[a-zA-Z0-9_-]+$/, 'Slug não pode conter caracteres especiais ou espaços'),
  image: string()
    .label('Imagem')
    .required('Obrigatório'),
  // content: string()
  //   .label('Conteúdo')
  //   .required('Obrigatório'),
  newLetterCategoryId: mixed()
    .label('Categoria')
    .required('Obrigatório'),
});

export const categoria = object()
.shape({
  category: string()
    .label('Categoria')
    .required('Obrigatório'),
  description: string()
    .label('Descrição de categoria'),
});

export const vacina = object()
.shape({
  name: string()
    .label('Nome')
    .required('Obrigatório'),
  applicationMethod: string()
    .label('Método de aplicação')
    .required('Obrigatório'),
  cautions: string()
    .label('Cuidados')
    .nullable(),
  description: string()
    .label('Descrição')
    .nullable(),
  ageGroup: array()
    .label('Faixa etária'),
  preventAgainst: array()
    .label('Prevenções'),
  healthFacilityIds: array()
    .label('Unidades de saúde'),
});

export const unidade = object()
.shape({
  name: string()
    .label('Nome')
    .required('Obrigatório'),
  slug: string()
    .label('Slug')
    .required('Obrigatório')
    .matches(/^[a-zA-Z0-9_-]+$/, 'Slug não pode conter caracteres especiais ou espaços'),
  phone: string()
    .label('Telefone')
    .nullable(),
  cep: string()
    .label('CEP')
    .required('Obrigatório'),
  number: string()
    .label('Número')
    .required('Obrigatório'),
  street: string()
    .label('Endereço')
    .required('Obrigatório'),
  neighborhood: string()
    .label('Bairro')
    .required('Obrigatório'),
  city: string()
    .label('Cidade')
    .required('Obrigatório'),
  state: string()
    .label('Estado')
    .required('Obrigatório'),
  applyVaccine: boolean()
  .label('Aplicará vacinas?')
  .nullable(),
  complement: string()
    .label('Complemento')
    .nullable(),
  collections: array().of(
      object().shape({
        dia: string().required('Obrigatório'),
        horarioInicio: string().required('Obrigatório'),
        horarioFim: string().required('Obrigatório'),
      })
    ).min(1, 'É necessário adicionar pelo menos um horário')
    .label('Coleta'),
    services: array().of(
      object().shape({
        dia: string().required('Obrigatório'),
        horarioInicio: string().required('Obrigatório'),
        horarioFim: string().required('Obrigatório'),
      })
    ).min(1, 'É necessário adicionar pelo menos um horário')
    .label('Serviços')
});

export const exame = object()
.shape({
  name: string()
    .label('Nome')
    .required('Obrigatório'),
  slug: string()
    .label('Slug')
    .required('Obrigatório')
    .matches(/^[a-zA-Z0-9_-]+$/, 'Slug não pode conter caracteres especiais ou espaços'),
  cautions: string()
    .label('Cuidados')
    .nullable(),
  resultDeadline: string()
    .label('Prazo para entrega')
    .nullable(),
  description: string()
    .label('Descrição')
    .nullable(),
  ageGroup: array()
    .label('Faixa etária'),
  otherNames: array()
    .label('Outros nomes'),
  healthFacilityIds: array()
    .label('Unidades de saúde'),
  collectionMethod: array()
    .label('Tipo de coleta'),
  sanguine: boolean()
    .label('Sanguíneo')
    .nullable(),
  genetic: boolean()
    .label('Genético')
    .nullable(),
  immunological: boolean()
    .label('Imunológico')
    .nullable(),
  biochemicals: boolean()
    .label('Bioquímicos')
    .nullable(),
  hematological: boolean()
    .label('Hematológicos')
    .nullable(),
  microbiological: boolean()
    .label('Microbiológicos')
    .nullable(),
  cytological: boolean()
    .label('Citológicos')
    .nullable(),
  toxicological: boolean()
    .label('Toxicológicos')
    .nullable(),
  image: boolean()
    .label('Imagem')
    .nullable(),
  functional: boolean()
    .label('Funcionais')
    .nullable(),
  urinalysis: boolean()
    .label('Urinálise e Parasitologia')
    .nullable(),
  coverageANS: boolean()
    .label('Exame possui cobertura ANS?')
    .nullable(),
  haveToSchedule: boolean()
    .label('Exame precisa ser agendado?')
    .nullable(),
});

export const documentos = object()
.shape({
  name: string()
  .label('Nome')
  .required('Obrigatório')
  .oneOf(
    [
      'Swab Bucal', 
      '1º semestre relatório de Transparência',
      '2º semestre relatório de Transparência',
      'Termo de consentimento',
      'Regulamento cartão v2'
    ],
    'O valor de "Nome" deve ser um dos seguintes: Swab Bucal, 1º semestre relatório de Transparência, 2º semestre relatório de Transparência, Termo de consentimento, Regulamento cartão v2.'
  ),
  type: string()
    .label('Tipo'),
  title: string()
    .label('Titulo')
    .required('Obrigatório'),
})

export const video = object()
.shape({
  link: string()
    .label('Url')
    .required('Obrigatório')
    .matches(
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
      'A URL deve ser de um vídeo do YouTube'
    ),
});