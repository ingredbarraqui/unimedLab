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
