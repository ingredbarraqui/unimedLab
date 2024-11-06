import {
  string,
} from 'yup';

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
    .required('obrigatório'),
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
});

export const noticia = object()
.shape({
  title: string()
    .label('Titulo')
    .required('obrigatório'),
  slug: string()
    .label('Slug')
    .required('obrigatório'),
  image: string()
    .label('Imagem')
    .required('obrigatório'),
  content: string()
    .label('Conteúdo')
    .required('obrigatório'),
  newLetterCategoryId: mixed()
    .label('Categoria')
    .required('obrigatório'),
});

export const categoria = object()
.shape({
  category: string()
    .label('categoria')
    .required('obrigatório'),
  description: string()
    .label('Descrição de categoria')
    .required('obrigatório'),
});

export const vacina = object()
.shape({
  name: string()
    .label('Nome')
    .required('obrigatório'),
  applicationMethod: string()
    .label('Método de aplicação')
    .required('obrigatório'),
  cautions: string()
    .label('Cuidados')
    .nullable(),
  description: string()
    .label('Descrição'),
  ageGroup: array()
    .label('Faixa etária'),
  preventAgainst: array()
    .label('Prevenções'),
  healthFacilityIds: array()
    .label('Unidades de saúde'),
});

export const unidade = object()
.shape({
  email: string()
    .label('E-mail')
    .email('E-mail inválido')
    .required('Preencha seu e-mail'),
  name: string()
    .label('Nome')
    .required('obrigatório'),
  slug: string()
    .label('Slug')
    .required('obrigatório'),
  phone: string()
    .label('Telefone')
    .required('Obrigatório'),
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
  complement: string()
    .label('Complemento')
    .nullable(),
});

export const exame = object()
.shape({
  name: string()
    .label('Nome')
    .required('obrigatório'),
  slug: string()
    .label('Slug')
    .required('obrigatório'),
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
});

export const video = object()
.shape({
  link: string()
    .label('Url')
    .required('obrigatório')
    .matches(
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
      'A URL deve ser de um vídeo do YouTube'
    ),
});