'use client';
import React, { useEffect, useState } from 'react';
import { DataTable } from "./data-table"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { capitalizeEachWord } from "@/utils/formatName"
import { Button } from "@/components/ui/button"

import DialogVisualizarEstudante from "./DialogVisualizarEstudante/DialogVisualizarEstudante"
import DialogEditarEstudante from "./DialogEditarEstudante/DialogEditarEstudante"
import DialogExcluirEstudante from "./DialogExcluirEstudante/DialogExcluirEstudante"

type Usuario = {
  _id: string,

  nome: string,
  matricula: string,
  cpf: string,
  email: string,
  tipoUsuario: string,

  dataCadastro: Date,
  chaveUsuario: string,
  chaveFarmacia: string,
}

export default function Usuario() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);

  const columns: ColumnDef<Usuario>[] = [
    {
      accessorKey: "nome",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="pl-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Usuário
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const nome = row.getValue("nome")
        const nomeFormatado = capitalizeEachWord(nome);

        return nomeFormatado
      },
    },
    {
      accessorKey: "cpf",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="pl-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            CPF
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="pl-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      header: "Operações",
      id: "actions",

      cell: ({ row }) => {
        return MenuOperacoesNewModel(row)
      },

    },
  ]

  function MenuOperacoesNewModel(row: any) {
    const dados = row.original

    return (
      <div className="flex hover:opacity-100 opacity-40" >
        <DialogVisualizarEstudante data={dados} />

        <DialogEditarEstudante data={dados} update={update} setUpdate={setUpdate} />

        <DialogExcluirEstudante data={dados} update={update} setUpdate={setUpdate} />
      </div>
    )
  }

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/estudante`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await res.json();
      setData(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [update]);

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tabela de estudantes</h2>
        </div>
      </div>
      <DataTable columns={columns} data={data} update={update} setUpdate={setUpdate} />
    </div>
  );
}
