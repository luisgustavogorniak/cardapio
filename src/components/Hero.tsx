import { Button } from "@/components/ui/button";
import React from "react";
import heroImg from "@/app/assets/hero-img.jpg";
import Image from "next/image";
import Link from "next/link";
import { stackServerApp } from "@/stack";

export const Hero = async () => {
  const app = stackServerApp.urls;

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12 lg:py-0">
        <div className="my-auto">
          <h1 className="mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2] tracking-tight">
            Gerencie seus Cardápios com Facilidade
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg">
            Organize, atualize e compartilhe cardápios de forma simples e
            eficiente. Tenha controle total sobre os pratos, categorias e preços
            do seu restaurante em um só lugar.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <Button size="lg" className="rounded-full text-base" asChild>
              <Link href={app.signIn}>Entrar</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
              asChild
            >
              <Link href={app.signUp}>Cadastrar</Link>
            </Button>
          </div>
        </div>

        <div className="relative w-full aspect-video lg:aspect-auto lg:w-[1000px] lg:h-screen bg-accent rounded-xl lg:rounded-none overflow-hidden">
          <Image
            src={heroImg}
            alt="Prato de restaurante colorido"
            fill
            className="object-cover rounded-xl lg:rounded-none"
            priority
            sizes="(max-width: 1024px) 100vw, 1000px"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
