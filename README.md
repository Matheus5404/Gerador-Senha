# Gerador de Senhas

Aplicativo mobile desenvolvido com **React Native** e **Expo** para geração de senhas personalizadas.

O projeto foi desenvolvido como atividade acadêmica com o objetivo de praticar conceitos de desenvolvimento mobile, componentes do React Native, gerenciamento de estado, eventos de toque e estilização de interfaces.

---

## Sobre o projeto

O **Gerador de Senhas** permite que o usuário defina a quantidade de caracteres desejada e gere uma senha aleatória.

Além da geração da senha, o aplicativo possui recursos de interação e feedback visual para melhorar a experiência do usuário.

A interface utiliza um tema escuro inspirado no visual do GitHub, com destaque para as cores azul e verde.

---

## Objetivos da atividade

O projeto atende aos seguintes requisitos:

- Permitir que o usuário defina o tamanho da senha.
- Gerar uma senha aleatória com o tamanho escolhido.
- Alterar a aparência dos botões enquanto eles estão sendo pressionados.
- Restaurar a aparência original dos botões após o toque.
- Implementar uma funcionalidade adicional escolhida pelo aluno.

---

## Funcionalidades

### 1. Definição do tamanho da senha

O usuário pode informar a quantidade de caracteres que deseja para sua senha.

O aplicativo permite senhas entre:

- **4 caracteres**, no mínimo;
- **32 caracteres**, no máximo.

O campo aceita somente números.

Caso o usuário informe um valor fora do intervalo permitido, o aplicativo apresenta uma mensagem informando o tamanho válido.

---

### 2. Geração de senha

Ao pressionar o botão **"Gerar senha"**, o aplicativo cria uma senha aleatória utilizando diferentes tipos de caracteres:

- Letras maiúsculas;
- Letras minúsculas;
- Números;
- Símbolos.

Exemplo:

```text
aB7@kP2#mX9!
