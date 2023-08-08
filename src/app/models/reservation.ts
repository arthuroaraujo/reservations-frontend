export interface Reservation {
    id: number;
    nomeHospede: string;
    dataInicio: Date;
    dataFim: Date;
    quantidadePessoas: number;
    status: "CONFIRMADA" | "PENDENTE" | "CANCELADA";
}
