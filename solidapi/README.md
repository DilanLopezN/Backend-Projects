#APP

GymPass API

#RFS (Requisitos funcionais)
- [] Deve ser Possivel se cadastrar;
- [] Deve ser possivel se autenticar;
- [] Deve ser possivel obter perfil de usuário logado;
- [] Deve ser possivel obter números de check-ins realizado pelo usuário;
- [] Deve ser possivel o usuário obter histórico de check-ins;
- [] Deve ser possivel o usuário buscar academias próximas;
- [] Deve ser possivel o usuário buscar academias pelo nome;
- [] Deve ser possivel o usuário realizar check-in em uma academia;
- [] Deve ser possivel validar o check-in de um usuário;
- [] Deve ser possivel cadastrar uma academia;
- [] Deve ser possivel
#RNA (Regras de negócio)
- [] Usuário não pode se cadastrar com o mesmo e-mail;
- [] Usuário não pode fazer dois check-ins no mesmo dia;
- [] Usuário não pode fazer check-in se estiver mais de 100m da academia;
- [] O Check-in só pode ser validado até 20 minutos após criado;
- [] O check-in só pode ser validado por administradores;
- [] Ocademia só pode ser cadastrado por administradores;

#RFNs(Requisitos não-funcionais)
- Senha do usuário precisa estar criptografada;
- Dados precisam estar persistidos em banco Postgress;
- Todas listas de dados precisam estár páginadas em até 20 items;
- O usuário deve ser identificado por JWT(json web token);