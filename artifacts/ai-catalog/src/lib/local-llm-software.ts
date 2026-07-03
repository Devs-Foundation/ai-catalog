export interface LocalLlmSoftware {
  id: string;
  name: string;
  description: string;
  website: string;
  platforms: string[];
  license: string;
  models: string[];
}

export const localLlmSoftware: LocalLlmSoftware[] = [
  {
    id: "ollama",
    name: "Ollama",
    description:
      "A ferramenta mais popular para correr LLMs localmente através da linha de comandos ou API. Basta um comando (ex.: \"ollama run llama3.3\") para descarregar e correr um modelo.",
    website: "https://ollama.com",
    platforms: ["Windows", "macOS", "Linux", "Docker"],
    license: "Gratuito, código aberto (MIT)",
    models: [
      "Llama 3.3 e 3.1 (Meta)",
      "Mistral e Mixtral (Mistral AI)",
      "Gemma 2 e Gemma 3 (Google)",
      "Qwen 2.5 e Qwen 3 (Alibaba)",
      "DeepSeek-R1 e DeepSeek-V3",
      "Phi-4 e Phi-3 (Microsoft)",
      "CodeLlama e StarCoder2 (código)",
      "LLaVA (visão e texto)",
      "Nomic Embed Text (embeddings)",
    ],
  },
  {
    id: "jan",
    name: "Jan",
    description:
      "Aplicação de secretária com interface de conversação semelhante ao ChatGPT, construída sobre o motor llama.cpp. Permite descarregar modelos GGUF diretamente do Hugging Face ou de uma coleção curada (Jan Hub).",
    website: "https://jan.ai",
    platforms: ["Windows", "macOS", "Linux"],
    license: "Gratuito, código aberto (AGPLv3)",
    models: [
      "Llama 3.1/3.2 (Meta)",
      "Mistral 7B e Mixtral (Mistral AI)",
      "Gemma 2 (Google)",
      "Qwen 2.5 (Alibaba)",
      "DeepSeek-R1 (destilado)",
      "Phi-3 (Microsoft)",
      "TinyLlama (modelos muito leves)",
      "Modelos GGUF personalizados do Hugging Face",
    ],
  },
  {
    id: "lm-studio",
    name: "LM Studio",
    description:
      "Aplicação de secretária com pesquisa integrada de modelos no formato GGUF e MLX, otimizada também para Apple Silicon. Oferece um servidor local compatível com a API da OpenAI.",
    website: "https://lmstudio.ai",
    platforms: ["Windows", "macOS", "Linux"],
    license: "Gratuito para uso pessoal (proprietário)",
    models: [
      "Llama 3.3 e 3.1 (Meta)",
      "Mistral e Mixtral (Mistral AI)",
      "Qwen 2.5 e QwQ (Alibaba)",
      "Gemma 2 (Google)",
      "DeepSeek-R1 e DeepSeek-Coder",
      "Phi-4 (Microsoft)",
      "StarCoder2 (código)",
      "Milhares de modelos GGUF/MLX do Hugging Face",
    ],
  },
  {
    id: "gpt4all",
    name: "GPT4All",
    description:
      "Uma das primeiras aplicações a popularizar os LLMs locais, da Nomic AI. Interface simples com uma lista curada de modelos prontos a instalar, com foco em correr bem mesmo em computadores mais modestos.",
    website: "https://www.nomic.ai/gpt4all",
    platforms: ["Windows", "macOS", "Linux"],
    license: "Gratuito, código aberto (MIT)",
    models: [
      "Llama 3 8B Instruct (Meta)",
      "Mistral OpenOrca",
      "Nous Hermes 2 Mistral",
      "Gemma 2 (Google)",
      "Orca Mini (modelos leves)",
      "Phi-3 Mini (Microsoft)",
      "Reasoner v1 (raciocínio)",
    ],
  },
  {
    id: "llamacpp",
    name: "llama.cpp",
    description:
      "O motor de inferência open-source em C/C++ que serve de base a muitas das aplicações acima. Indicado para utilizadores avançados que querem controlo total via linha de comandos ou integrar num projeto próprio.",
    website: "https://github.com/ggml-org/llama.cpp",
    platforms: ["Windows", "macOS", "Linux", "Android", "iOS"],
    license: "Gratuito, código aberto (MIT)",
    models: [
      "Qualquer modelo no formato GGUF (Llama, Mistral, Qwen, Gemma, Phi, DeepSeek, entre outros)",
      "Conversão de modelos do Hugging Face para GGUF incluída",
    ],
  },
  {
    id: "anythingllm",
    name: "AnythingLLM",
    description:
      "Aplicação de secretária tudo-em-um da Mintplex Labs, com motor de inferência local integrado, criação de agentes e RAG (conversar com os seus próprios documentos). Também se liga a servidores locais como Ollama ou LM Studio.",
    website: "https://anythingllm.com",
    platforms: ["Windows", "macOS", "Linux", "Docker"],
    license: "Gratuito, código aberto (MIT)",
    models: [
      "Llama 3.x (Meta) via motor embutido",
      "Mistral e Mixtral (Mistral AI)",
      "Phi-3 (Microsoft)",
      "Gemma 2 (Google)",
      "Qualquer modelo GGUF ligado via Ollama ou LM Studio",
    ],
  },
  {
    id: "open-webui",
    name: "Open WebUI",
    description:
      "Interface web self-hosted, ao estilo ChatGPT, para usar com o Ollama ou qualquer servidor compatível com a API da OpenAI. Corre num contentor Docker na sua própria rede, com suporte a múltiplos utilizadores.",
    website: "https://openwebui.com",
    platforms: ["Windows", "macOS", "Linux", "Docker"],
    license: "Gratuito, código aberto (BSD modificada)",
    models: [
      "Todos os modelos disponíveis através do Ollama (Llama, Mistral, Gemma, Qwen, DeepSeek, Phi)",
      "Ligação opcional a APIs externas (OpenAI, Anthropic) para uso híbrido",
    ],
  },
  {
    id: "koboldcpp",
    name: "KoboldCpp",
    description:
      "Motor de inferência baseado em llama.cpp, distribuído como um único executável, muito popular na comunidade de escrita criativa e role-play graças à sua interface web dedicada a histórias e personagens.",
    website: "https://github.com/LostRuins/koboldcpp",
    platforms: ["Windows", "Linux", "macOS"],
    license: "Gratuito, código aberto (AGPLv3)",
    models: [
      "Llama 3 e Mistral/Mixtral (formato GGUF)",
      "Nous Hermes (afinação popular para conversação e role-play)",
      "MythoMax e outras afinações de escrita criativa",
      "Command-R (Cohere, versões open-weight)",
    ],
  },
  {
    id: "text-generation-webui",
    name: "Text Generation WebUI (oobabooga)",
    description:
      "Interface web em Gradio muito versátil, com suporte a múltiplos motores de inferência (llama.cpp, ExLlama, Transformers). Popular entre utilizadores avançados que querem afinar parâmetros de geração ao detalhe.",
    website: "https://github.com/oobabooga/text-generation-webui",
    platforms: ["Windows", "macOS", "Linux"],
    license: "Gratuito, código aberto (AGPLv3)",
    models: [
      "Llama 3.x e CodeLlama (Meta)",
      "Mistral e Mixtral (Mistral AI)",
      "Nous Hermes e outras afinações da comunidade",
      "Qwen 2.5 e DeepSeek",
      "Modelos GPTQ, AWQ e GGUF do Hugging Face",
    ],
  },
];
