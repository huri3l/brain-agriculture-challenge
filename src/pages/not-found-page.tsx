import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export const NotFoundPage = () => {
  return (
    <div className="dark bg-background w-screen h-screen flex flex-col gap-8 justify-center items-center">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-primary">Página não encontrada</h1>
        <p className="text-muted-foreground">Não encontramos a página que você está acessando. Clique no botão abaixo para voltar para a página inicial</p>
      </div>
      <Link to="/">
        <Button>Volte para a Página inicial</Button>
      </Link>
    </div>
  )
}