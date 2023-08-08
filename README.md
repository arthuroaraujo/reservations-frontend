# Projeto Front End Angular - Reservas

Este projeto é a interface de usuário construída com Angular para interagir com o backend de gerenciamento de reservas de uma casa de temporada.

## Instalação

1. Clone este repositório:

   ```bash
   git clone git@github.com:arthuroaraujo/reservations-frontend.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd reservas-frontend
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

## Uso

Para iniciar o servidor de desenvolvimento e visualizar o projeto, execute o seguinte comando:

```bash
npm start
```

O aplicativo estará disponível em [http://localhost:4200/](http://localhost:4200/)

## Funcionalidades

### Listagem de Reservas

- **Listar Todas as Reservas:**

  ```typescript
  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.list = resposta;
    });
  }
  ```

- **Buscar Reserva por ID:**

  ```typescript
  findById(): void {
    if (this.searchId !== null) {
      this.service.findById(this.searchId).subscribe((resposta) => {
        this.list = resposta ? [resposta] : [];
      });
    }
  }
  ```

### Gerenciamento de Reservas

- **Criar Nova Reserva:**

  ```typescript
  create(reservation: Reservation): void {
    this.service.create(reservation).subscribe((resposta) => {
      this.list.push(resposta);
      this.selectedReservation = null;
      this.resetForm();
    });
  }
  ```

- **Atualizar Reserva:**

  ```typescript
  edit(id: number): void {
    this.editingId = id;
    const reservationToEdit = this.list.find(item => item.id === id);
    if (reservationToEdit) {
      this.newReservation = { ...reservationToEdit };
    }
  }
  ```

- **Cancelar Reserva:**

  ```typescript
  cancel(id: number): void {
    this.service.delete(id).subscribe(() => {
      const index = this.list.findIndex(item => item.id === id);
      if (index !== -1) {
        this.list[index].status = 'CANCELADA';
      }
    });
  }
  ```

### Filtros de Status de Reserva

- **Listar Reservas Confirmadas:**

  ```typescript
  findAllConfirmed(): void {
    this.service.findAllConfirmed().subscribe((resposta) => {
      this.list = resposta;
    });
  }
  ```

- **Listar Reservas Pendentes:**

  ```typescript
  findAllPending(): void {
    this.service.findAllPending().subscribe((resposta) => {
      this.list = resposta;
    });
  }
  ```

- **Listar Reservas Canceladas:**

  ```typescript
  findAllCancelled(): void {
    this.service.findAllCancelled().subscribe((resposta) => {
      this.list = resposta;
    });
  }
  ```

Claro, aqui está a seção "Dificuldades/Próximos Passos" ajustada para o formato de um README:

## Dificuldades/Próximos Passos

Durante o desenvolvimento do Front End, enfrentei desafios ao utilizar o formulário para as funcionalidades de criar (POST) e editar (PUT) reservas. Devido a essas dificuldades, a funcionalidade de edição no Front End ainda não está funcionando corretamente. Essa questão é considerada uma prioridade para os próximos passos do desenvolvimento da aplicação.

## Tratativa de Erros

As tratativas de erros foram implementadas no Back End para melhorar a robustez do sistema. Como resultado, em alguns momentos, certas operações podem ser impedidas devido a restrições definidas. Abaixo estão as tratativas de erros implementadas:

- Ao criar uma reserva:
  - "Data indisponível para reserva."

- Ao atualizar uma reserva:
  - "Data indisponível para atualização."
  - "Não é possível atualizar uma reserva cancelada."

Além disso, foram definidas as seguintes regras para garantir a integridade dos dados:
- A data de início da viagem não pode ser posterior à data de fim da viagem.
- Não é possível adicionar ou atualizar reservas com datas no passado.
- Caso uma reserva não seja encontrada pelo ID fornecido:
  - "Reserva não encontrada com o ID: " + id

Essas tratativas e regras visam assegurar a consistência e a confiabilidade das operações no sistema de reservas de hotel.

## Próximos Passos

Os próximos passos para o desenvolvimento da aplicação incluem a resolução das dificuldades relacionadas à funcionalidade de edição no Front End, aprimorando a experiência do usuário. Além disso, será considerado o aprimoramento das tratativas de erros e a adição de validações adicionais para garantir um funcionamento estável e confiável do sistema.
