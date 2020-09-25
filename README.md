![Banner GoBarber Backend](https://github.com/jnerydesigner/gobarber-backend/blob/master/banner-github.png)

# Backend do Aplicativo GoBarber

## Listas de Tarefas

## Recuperação de Senha
**RF - Requisitos Funcionais**

- O Usuário deve poder recuperar sua senha informando seu email;
- O usuário deve receber o email com instruções de recuperação de senha;
- o usuário deve poder resetar sua senha;

**RNF - Requisitos Não Funcionais**

- Utilizar mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar o Amazon SES para envio em produção;
- O Envio de email deve acontecer em segundo plano (background job);


**RN - Regras de Negócios**

- o link enviado por email para resetar sua senha, deve expirar em 2 hs;
- o usuário precisa confirmar a nova senha ao resetar sua senha;


## Atualização de Perfil
**RF - Requisitos Funcionais**
- O usuário deve atualizar seu nome, email e senha

**RNF - Requisitos Não Funcionais**

**RN - Regras de Negócios**
- o usuário não pode alterar seu email para um email já utilizado;
- para atualizar sua senha o usuário deve informar a senha antiga;
- o usuário precisa confirmar a nova senha ao alterar sua senha;





## Painel do Prestador
**RF - Requisitos Funcionais**
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- o prestador deve poder visualizar as notificações não lidas

**RNF - Requisitos Não Funcionais**
- A agendamentos daquele dia devem ser armazenadas em cache;
- As notificações do prestador devem ser armazenadas no mongodb
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io;

**RN - Regras de Negócios**
- A notificação deve ter status de lida ou não lida

## Agendamento de Serviços

**RF - Requisitos Funcionais**
- O usuário deve poder listar todos os prestadores de serviços cadastrados
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF - Requisitos Não Funcionais**
- A listagem de prestadores deve ser armazenada em cache;


**RN - Regras de Negócios**
- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 08h e o último às 17h);
- O usário não pode agendar em um horário já ocupado;
- O usário não pode agendar serviços consigo mesmo;







## By Jander Nery
* ##  [Linkedin](https://www.linkedin.com/in/jander-nery-61531335/)
