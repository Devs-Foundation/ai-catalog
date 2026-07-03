import { LanguageCode } from "./translations";
import { LocalLlmSoftware } from "./local-llm-software";

export interface LocalLlmTranslation {
  description: string;
  license: string;
  models: string[];
}

// Auto-generated: per-language translations of the local-LLM software entries,
// keyed by software id. Base file (local-llm-software.ts) is the PT-PT fallback.
export const localLlmI18n: Record<string, Partial<Record<LanguageCode, LocalLlmTranslation>>> = {
"anythingllm": {
"de": {
"description": "All-in-one-Desktop-Anwendung von Mintplex Labs mit integrierter lokaler Inferenz-Engine, Agentenerstellung und RAG (Chat mit den eigenen Dokumenten). Verbindet sich auch mit lokalen Servern wie Ollama oder LM Studio.",
"license": "Kostenlos, Open Source (MIT)",
"models": [
"Llama 3.x (Meta) über die integrierte Engine",
"Mistral und Mixtral (Mistral AI)",
"Phi-3 (Microsoft)",
"Gemma 2 (Google)",
"Jedes GGUF-Modell, verbunden über Ollama oder LM Studio"
]
},
"en": {
"description": "All-in-one desktop application by Mintplex Labs, with a built-in local inference engine, agent creation, and RAG (chat with your own documents). Also connects to local servers such as Ollama or LM Studio.",
"license": "Free, open source (MIT)",
"models": [
"Llama 3.x (Meta) via built-in engine",
"Mistral and Mixtral (Mistral AI)",
"Phi-3 (Microsoft)",
"Gemma 2 (Google)",
"Any GGUF model connected via Ollama or LM Studio"
]
},
"es": {
"description": "Aplicación de escritorio todo en uno de Mintplex Labs, con motor de inferencia local integrado, creación de agentes y RAG (conversar con sus propios documentos). También se conecta a servidores locales como Ollama o LM Studio.",
"license": "Gratuito, código abierto (MIT)",
"models": [
"Llama 3.x (Meta) a través del motor integrado",
"Mistral y Mixtral (Mistral AI)",
"Phi-3 (Microsoft)",
"Gemma 2 (Google)",
"Cualquier modelo GGUF conectado a través de Ollama o LM Studio"
]
},
"fr": {
"description": "Application de bureau tout-en-un de Mintplex Labs, avec moteur d'inférence local intégré, création d'agents et RAG (dialoguer avec vos propres documents). Se connecte également à des serveurs locaux comme Ollama ou LM Studio.",
"license": "Gratuit, open source (MIT)",
"models": [
"Llama 3.x (Meta) via le moteur intégré",
"Mistral et Mixtral (Mistral AI)",
"Phi-3 (Microsoft)",
"Gemma 2 (Google)",
"N'importe quel modèle GGUF connecté via Ollama ou LM Studio"
]
},
"zh": {
"description": "由 Mintplex Labs 打造的一体化桌面应用程序，内置本地推理引擎、智能体创建功能以及 RAG（与您自己的文档对话）。也可连接 Ollama 或 LM Studio 等本地服务器。",
"license": "免费，开源（MIT）",
"models": [
"Llama 3.x（Meta，通过内置引擎）",
"Mistral 和 Mixtral（Mistral AI）",
"Phi-3（微软）",
"Gemma 2（Google）",
"通过 Ollama 或 LM Studio 连接的任意 GGUF 模型"
]
}
},
"gpt4all": {
"de": {
"description": "Eine der ersten Anwendungen, die lokale LLMs populär gemacht hat, von Nomic AI. Einfache Oberfläche mit einer kuratierten Liste installationsbereiter Modelle, mit Fokus darauf, auch auf bescheideneren Computern gut zu laufen.",
"license": "Kostenlos, Open Source (MIT)",
"models": [
"Llama 3 8B Instruct (Meta)",
"Mistral OpenOrca",
"Nous Hermes 2 Mistral",
"Gemma 2 (Google)",
"Orca Mini (leichte Modelle)",
"Phi-3 Mini (Microsoft)",
"Reasoner v1 (Reasoning)"
]
},
"en": {
"description": "One of the first applications to popularize local LLMs, by Nomic AI. Simple interface with a curated list of ready-to-install models, focused on running well even on more modest computers.",
"license": "Free, open source (MIT)",
"models": [
"Llama 3 8B Instruct (Meta)",
"Mistral OpenOrca",
"Nous Hermes 2 Mistral",
"Gemma 2 (Google)",
"Orca Mini (lightweight models)",
"Phi-3 Mini (Microsoft)",
"Reasoner v1 (reasoning)"
]
},
"es": {
"description": "Una de las primeras aplicaciones en popularizar los LLM locales, de Nomic AI. Interfaz sencilla con una lista seleccionada de modelos listos para instalar, centrada en funcionar bien incluso en ordenadores más modestos.",
"license": "Gratuito, código abierto (MIT)",
"models": [
"Llama 3 8B Instruct (Meta)",
"Mistral OpenOrca",
"Nous Hermes 2 Mistral",
"Gemma 2 (Google)",
"Orca Mini (modelos ligeros)",
"Phi-3 Mini (Microsoft)",
"Reasoner v1 (razonamiento)"
]
},
"fr": {
"description": "L'une des premières applications à avoir popularisé les LLM locaux, développée par Nomic AI. Interface simple avec une liste sélectionnée de modèles prêts à installer, conçue pour bien fonctionner même sur des ordinateurs plus modestes.",
"license": "Gratuit, open source (MIT)",
"models": [
"Llama 3 8B Instruct (Meta)",
"Mistral OpenOrca",
"Nous Hermes 2 Mistral",
"Gemma 2 (Google)",
"Orca Mini (modèles légers)",
"Phi-3 Mini (Microsoft)",
"Reasoner v1 (raisonnement)"
]
},
"zh": {
"description": "由 Nomic AI 打造，是最早推动本地大语言模型普及的应用之一。界面简洁，提供精选的可直接安装模型列表，专注于在配置一般的电脑上也能流畅运行。",
"license": "免费，开源（MIT）",
"models": [
"Llama 3 8B Instruct（Meta）",
"Mistral OpenOrca",
"Nous Hermes 2 Mistral",
"Gemma 2（Google）",
"Orca Mini（轻量模型）",
"Phi-3 Mini（微软）",
"Reasoner v1（推理）"
]
}
},
"jan": {
"de": {
"description": "Desktop-Anwendung mit einer ChatGPT-ähnlichen Konversationsoberfläche, aufgebaut auf der llama.cpp-Engine. Ermöglicht das Herunterladen von GGUF-Modellen direkt von Hugging Face oder aus einer kuratierten Sammlung (Jan Hub).",
"license": "Kostenlos, Open Source (AGPLv3)",
"models": [
"Llama 3.1/3.2 (Meta)",
"Mistral 7B und Mixtral (Mistral AI)",
"Gemma 2 (Google)",
"Qwen 2.5 (Alibaba)",
"DeepSeek-R1 (destilliert)",
"Phi-3 (Microsoft)",
"TinyLlama (sehr leichte Modelle)",
"Benutzerdefinierte GGUF-Modelle von Hugging Face"
]
},
"en": {
"description": "Desktop application with a ChatGPT-like conversational interface, built on the llama.cpp engine. Lets you download GGUF models directly from Hugging Face or from a curated collection (Jan Hub).",
"license": "Free, open source (AGPLv3)",
"models": [
"Llama 3.1/3.2 (Meta)",
"Mistral 7B and Mixtral (Mistral AI)",
"Gemma 2 (Google)",
"Qwen 2.5 (Alibaba)",
"DeepSeek-R1 (distilled)",
"Phi-3 (Microsoft)",
"TinyLlama (very lightweight models)",
"Custom GGUF models from Hugging Face"
]
},
"es": {
"description": "Aplicación de escritorio con una interfaz de conversación similar a ChatGPT, construida sobre el motor llama.cpp. Permite descargar modelos GGUF directamente desde Hugging Face o desde una colección seleccionada (Jan Hub).",
"license": "Gratuito, código abierto (AGPLv3)",
"models": [
"Llama 3.1/3.2 (Meta)",
"Mistral 7B y Mixtral (Mistral AI)",
"Gemma 2 (Google)",
"Qwen 2.5 (Alibaba)",
"DeepSeek-R1 (destilado)",
"Phi-3 (Microsoft)",
"TinyLlama (modelos muy ligeros)",
"Modelos GGUF personalizados de Hugging Face"
]
},
"fr": {
"description": "Application de bureau avec une interface de conversation semblable à ChatGPT, construite sur le moteur llama.cpp. Permet de télécharger des modèles GGUF directement depuis Hugging Face ou depuis une collection sélectionnée (Jan Hub).",
"license": "Gratuit, open source (AGPLv3)",
"models": [
"Llama 3.1/3.2 (Meta)",
"Mistral 7B et Mixtral (Mistral AI)",
"Gemma 2 (Google)",
"Qwen 2.5 (Alibaba)",
"DeepSeek-R1 (distillé)",
"Phi-3 (Microsoft)",
"TinyLlama (modèles très légers)",
"Modèles GGUF personnalisés depuis Hugging Face"
]
},
"zh": {
"description": "一款拥有类似 ChatGPT 对话界面的桌面应用程序，基于 llama.cpp 引擎构建。可直接从 Hugging Face 或精选合集（Jan Hub）下载 GGUF 模型。",
"license": "免费，开源（AGPLv3）",
"models": [
"Llama 3.1/3.2（Meta）",
"Mistral 7B 和 Mixtral（Mistral AI）",
"Gemma 2（Google）",
"Qwen 2.5（阿里巴巴）",
"DeepSeek-R1（蒸馏版）",
"Phi-3（微软）",
"TinyLlama（超轻量模型）",
"来自 Hugging Face 的自定义 GGUF 模型"
]
}
},
"koboldcpp": {
"de": {
"description": "Auf llama.cpp basierende Inferenz-Engine, die als einzelne ausführbare Datei verteilt wird und in der Community für kreatives Schreiben und Rollenspiel dank ihrer speziellen Weboberfläche für Geschichten und Charaktere sehr beliebt ist.",
"license": "Kostenlos, Open Source (AGPLv3)",
"models": [
"Llama 3 und Mistral/Mixtral (GGUF-Format)",
"Nous Hermes (beliebtes Fine-Tuning für Konversation und Rollenspiel)",
"MythoMax und weitere Fine-Tunings für kreatives Schreiben",
"Command-R (Cohere, Open-Weight-Versionen)"
]
},
"en": {
"description": "Inference engine based on llama.cpp, distributed as a single executable, very popular in the creative-writing and role-play community thanks to its web interface dedicated to stories and characters.",
"license": "Free, open source (AGPLv3)",
"models": [
"Llama 3 and Mistral/Mixtral (GGUF format)",
"Nous Hermes (popular fine-tune for conversation and role-play)",
"MythoMax and other creative-writing fine-tunes",
"Command-R (Cohere, open-weight versions)"
]
},
"es": {
"description": "Motor de inferencia basado en llama.cpp, distribuido como un único ejecutable, muy popular en la comunidad de escritura creativa y role-play gracias a su interfaz web dedicada a historias y personajes.",
"license": "Gratuito, código abierto (AGPLv3)",
"models": [
"Llama 3 y Mistral/Mixtral (formato GGUF)",
"Nous Hermes (ajuste fino popular para conversación y role-play)",
"MythoMax y otros ajustes finos de escritura creativa",
"Command-R (Cohere, versiones open-weight)"
]
},
"fr": {
"description": "Moteur d'inférence basé sur llama.cpp, distribué sous la forme d'un exécutable unique, très populaire dans la communauté de l'écriture créative et du jeu de rôle grâce à son interface web dédiée aux histoires et aux personnages.",
"license": "Gratuit, open source (AGPLv3)",
"models": [
"Llama 3 et Mistral/Mixtral (format GGUF)",
"Nous Hermes (fine-tuning populaire pour la conversation et le jeu de rôle)",
"MythoMax et d'autres fine-tunings d'écriture créative",
"Command-R (Cohere, versions open-weight)"
]
},
"zh": {
"description": "基于 llama.cpp 的推理引擎，以单一可执行文件形式发布，凭借其专为故事和角色打造的网页界面，在创意写作和角色扮演社区中非常受欢迎。",
"license": "免费，开源（AGPLv3）",
"models": [
"Llama 3 和 Mistral/Mixtral（GGUF 格式）",
"Nous Hermes（用于对话和角色扮演的热门微调版本）",
"MythoMax 及其他创意写作微调版本",
"Command-R（Cohere，开放权重版本）"
]
}
},
"llamacpp": {
"de": {
"description": "Die Open-Source-Inferenz-Engine in C/C++, auf der viele der oben genannten Anwendungen basieren. Geeignet für fortgeschrittene Nutzer, die volle Kontrolle über die Kommandozeile wollen oder sie in ein eigenes Projekt integrieren möchten.",
"license": "Kostenlos, Open Source (MIT)",
"models": [
"Jedes Modell im GGUF-Format (u. a. Llama, Mistral, Qwen, Gemma, Phi, DeepSeek)",
"Konvertierung von Hugging-Face-Modellen zu GGUF inbegriffen"
]
},
"en": {
"description": "The open-source C/C++ inference engine that underlies many of the applications above. Suited to advanced users who want full control via the command line or want to integrate it into their own project.",
"license": "Free, open source (MIT)",
"models": [
"Any model in GGUF format (Llama, Mistral, Qwen, Gemma, Phi, DeepSeek, among others)",
"Conversion of Hugging Face models to GGUF included"
]
},
"es": {
"description": "El motor de inferencia open-source en C/C++ que sirve de base a muchas de las aplicaciones anteriores. Indicado para usuarios avanzados que quieren control total a través de la línea de comandos o integrarlo en su propio proyecto.",
"license": "Gratuito, código abierto (MIT)",
"models": [
"Cualquier modelo en formato GGUF (Llama, Mistral, Qwen, Gemma, Phi, DeepSeek, entre otros)",
"Conversión de modelos de Hugging Face a GGUF incluida"
]
},
"fr": {
"description": "Le moteur d'inférence open source en C/C++ qui sert de base à bon nombre des applications ci-dessus. Destiné aux utilisateurs avancés souhaitant un contrôle total via la ligne de commande ou une intégration dans leur propre projet.",
"license": "Gratuit, open source (MIT)",
"models": [
"N'importe quel modèle au format GGUF (Llama, Mistral, Qwen, Gemma, Phi, DeepSeek, entre autres)",
"Conversion des modèles Hugging Face vers GGUF incluse"
]
},
"zh": {
"description": "为上述许多应用提供支持的开源 C/C++ 推理引擎。适合希望通过命令行完全掌控，或希望将其集成到自有项目中的高级用户。",
"license": "免费，开源（MIT）",
"models": [
"任何 GGUF 格式的模型（包括 Llama、Mistral、Qwen、Gemma、Phi、DeepSeek 等）",
"内置 Hugging Face 模型转换为 GGUF 的功能"
]
}
},
"lm-studio": {
"de": {
"description": "Desktop-Anwendung mit integrierter Suche nach Modellen im GGUF- und MLX-Format, ebenfalls für Apple Silicon optimiert. Bietet einen lokalen Server, der mit der OpenAI-API kompatibel ist.",
"license": "Kostenlos für den persönlichen Gebrauch (proprietär)",
"models": [
"Llama 3.3 und 3.1 (Meta)",
"Mistral und Mixtral (Mistral AI)",
"Qwen 2.5 und QwQ (Alibaba)",
"Gemma 2 (Google)",
"DeepSeek-R1 und DeepSeek-Coder",
"Phi-4 (Microsoft)",
"StarCoder2 (Code)",
"Tausende GGUF/MLX-Modelle von Hugging Face"
]
},
"en": {
"description": "Desktop application with built-in search for models in GGUF and MLX format, also optimized for Apple Silicon. Offers a local server compatible with the OpenAI API.",
"license": "Free for personal use (proprietary)",
"models": [
"Llama 3.3 and 3.1 (Meta)",
"Mistral and Mixtral (Mistral AI)",
"Qwen 2.5 and QwQ (Alibaba)",
"Gemma 2 (Google)",
"DeepSeek-R1 and DeepSeek-Coder",
"Phi-4 (Microsoft)",
"StarCoder2 (code)",
"Thousands of GGUF/MLX models from Hugging Face"
]
},
"es": {
"description": "Aplicación de escritorio con búsqueda integrada de modelos en formato GGUF y MLX, también optimizada para Apple Silicon. Ofrece un servidor local compatible con la API de OpenAI.",
"license": "Gratuito para uso personal (propietario)",
"models": [
"Llama 3.3 y 3.1 (Meta)",
"Mistral y Mixtral (Mistral AI)",
"Qwen 2.5 y QwQ (Alibaba)",
"Gemma 2 (Google)",
"DeepSeek-R1 y DeepSeek-Coder",
"Phi-4 (Microsoft)",
"StarCoder2 (código)",
"Miles de modelos GGUF/MLX de Hugging Face"
]
},
"fr": {
"description": "Application de bureau avec recherche intégrée de modèles au format GGUF et MLX, également optimisée pour Apple Silicon. Propose un serveur local compatible avec l'API OpenAI.",
"license": "Gratuit pour un usage personnel (propriétaire)",
"models": [
"Llama 3.3 et 3.1 (Meta)",
"Mistral et Mixtral (Mistral AI)",
"Qwen 2.5 et QwQ (Alibaba)",
"Gemma 2 (Google)",
"DeepSeek-R1 et DeepSeek-Coder",
"Phi-4 (Microsoft)",
"StarCoder2 (code)",
"Des milliers de modèles GGUF/MLX depuis Hugging Face"
]
},
"zh": {
"description": "内置 GGUF 和 MLX 格式模型搜索功能的桌面应用程序，同时针对 Apple Silicon 进行了优化。提供与 OpenAI API 兼容的本地服务器。",
"license": "个人使用免费（专有）",
"models": [
"Llama 3.3 和 3.1（Meta）",
"Mistral 和 Mixtral（Mistral AI）",
"Qwen 2.5 和 QwQ（阿里巴巴）",
"Gemma 2（Google）",
"DeepSeek-R1 和 DeepSeek-Coder",
"Phi-4（微软）",
"StarCoder2（代码）",
"来自 Hugging Face 的数千个 GGUF/MLX 模型"
]
}
},
"ollama": {
"de": {
"description": "Das beliebteste Tool, um LLMs lokal über die Kommandozeile oder eine API auszuführen. Ein einziger Befehl (z. B. \"ollama run llama3.3\") genügt, um ein Modell herunterzuladen und auszuführen.",
"license": "Kostenlos, Open Source (MIT)",
"models": [
"Llama 3.3 und 3.1 (Meta)",
"Mistral und Mixtral (Mistral AI)",
"Gemma 2 und Gemma 3 (Google)",
"Qwen 2.5 und Qwen 3 (Alibaba)",
"DeepSeek-R1 und DeepSeek-V3",
"Phi-4 und Phi-3 (Microsoft)",
"CodeLlama und StarCoder2 (Code)",
"LLaVA (Bild und Text)",
"Nomic Embed Text (Embeddings)"
]
},
"en": {
"description": "The most popular tool for running LLMs locally via the command line or an API. Just one command (e.g. \"ollama run llama3.3\") is enough to download and run a model.",
"license": "Free, open source (MIT)",
"models": [
"Llama 3.3 and 3.1 (Meta)",
"Mistral and Mixtral (Mistral AI)",
"Gemma 2 and Gemma 3 (Google)",
"Qwen 2.5 and Qwen 3 (Alibaba)",
"DeepSeek-R1 and DeepSeek-V3",
"Phi-4 and Phi-3 (Microsoft)",
"CodeLlama and StarCoder2 (code)",
"LLaVA (vision and text)",
"Nomic Embed Text (embeddings)"
]
},
"es": {
"description": "La herramienta más popular para ejecutar LLMs localmente a través de la línea de comandos o una API. Basta un comando (p. ej. \"ollama run llama3.3\") para descargar y ejecutar un modelo.",
"license": "Gratuito, código abierto (MIT)",
"models": [
"Llama 3.3 y 3.1 (Meta)",
"Mistral y Mixtral (Mistral AI)",
"Gemma 2 y Gemma 3 (Google)",
"Qwen 2.5 y Qwen 3 (Alibaba)",
"DeepSeek-R1 y DeepSeek-V3",
"Phi-4 y Phi-3 (Microsoft)",
"CodeLlama y StarCoder2 (código)",
"LLaVA (visión y texto)",
"Nomic Embed Text (embeddings)"
]
},
"fr": {
"description": "L'outil le plus populaire pour exécuter des LLM en local via la ligne de commande ou une API. Une seule commande (ex. « ollama run llama3.3 ») suffit pour télécharger et exécuter un modèle.",
"license": "Gratuit, open source (MIT)",
"models": [
"Llama 3.3 et 3.1 (Meta)",
"Mistral et Mixtral (Mistral AI)",
"Gemma 2 et Gemma 3 (Google)",
"Qwen 2.5 et Qwen 3 (Alibaba)",
"DeepSeek-R1 et DeepSeek-V3",
"Phi-4 et Phi-3 (Microsoft)",
"CodeLlama et StarCoder2 (code)",
"LLaVA (vision et texte)",
"Nomic Embed Text (embeddings)"
]
},
"zh": {
"description": "通过命令行或 API 在本地运行大语言模型（LLM）最流行的工具。只需一条命令（例如 \"ollama run llama3.3\"）即可下载并运行模型。",
"license": "免费，开源（MIT）",
"models": [
"Llama 3.3 和 3.1（Meta）",
"Mistral 和 Mixtral（Mistral AI）",
"Gemma 2 和 Gemma 3（Google）",
"Qwen 2.5 和 Qwen 3（阿里巴巴）",
"DeepSeek-R1 和 DeepSeek-V3",
"Phi-4 和 Phi-3（微软）",
"CodeLlama 和 StarCoder2（代码）",
"LLaVA（视觉与文本）",
"Nomic Embed Text（嵌入向量）"
]
}
},
"open-webui": {
"de": {
"description": "Selbst gehostete Weboberfläche im ChatGPT-Stil zur Nutzung mit Ollama oder jedem mit der OpenAI-API kompatiblen Server. Läuft in einem Docker-Container im eigenen Netzwerk und unterstützt mehrere Benutzer.",
"license": "Kostenlos, Open Source (modifizierte BSD)",
"models": [
"Alle über Ollama verfügbaren Modelle (Llama, Mistral, Gemma, Qwen, DeepSeek, Phi)",
"Optionale Verbindung zu externen APIs (OpenAI, Anthropic) für Hybridnutzung"
]
},
"en": {
"description": "Self-hosted, ChatGPT-style web interface for use with Ollama or any server compatible with the OpenAI API. Runs in a Docker container on your own network, with support for multiple users.",
"license": "Free, open source (modified BSD)",
"models": [
"All models available through Ollama (Llama, Mistral, Gemma, Qwen, DeepSeek, Phi)",
"Optional connection to external APIs (OpenAI, Anthropic) for hybrid use"
]
},
"es": {
"description": "Interfaz web autoalojada, al estilo ChatGPT, para usar con Ollama o cualquier servidor compatible con la API de OpenAI. Se ejecuta en un contenedor Docker en su propia red, con soporte para múltiples usuarios.",
"license": "Gratuito, código abierto (BSD modificada)",
"models": [
"Todos los modelos disponibles a través de Ollama (Llama, Mistral, Gemma, Qwen, DeepSeek, Phi)",
"Conexión opcional a APIs externas (OpenAI, Anthropic) para uso híbrido"
]
},
"fr": {
"description": "Interface web auto-hébergée, façon ChatGPT, à utiliser avec Ollama ou tout serveur compatible avec l'API OpenAI. Fonctionne dans un conteneur Docker sur votre propre réseau, avec prise en charge de plusieurs utilisateurs.",
"license": "Gratuit, open source (BSD modifiée)",
"models": [
"Tous les modèles disponibles via Ollama (Llama, Mistral, Gemma, Qwen, DeepSeek, Phi)",
"Connexion optionnelle à des API externes (OpenAI, Anthropic) pour un usage hybride"
]
},
"zh": {
"description": "自托管的类 ChatGPT 风格网页界面，可与 Ollama 或任何兼容 OpenAI API 的服务器配合使用。在您自己网络中的 Docker 容器内运行，支持多用户。",
"license": "免费，开源（修改版 BSD）",
"models": [
"通过 Ollama 提供的所有模型（Llama、Mistral、Gemma、Qwen、DeepSeek、Phi）",
"可选连接外部 API（OpenAI、Anthropic）以实现混合使用"
]
}
},
"text-generation-webui": {
"de": {
"description": "Sehr vielseitige Weboberfläche in Gradio mit Unterstützung für mehrere Inferenz-Engines (llama.cpp, ExLlama, Transformers). Beliebt bei fortgeschrittenen Nutzern, die Generierungsparameter im Detail feinabstimmen möchten.",
"license": "Kostenlos, Open Source (AGPLv3)",
"models": [
"Llama 3.x und CodeLlama (Meta)",
"Mistral und Mixtral (Mistral AI)",
"Nous Hermes und weitere Community-Fine-Tunings",
"Qwen 2.5 und DeepSeek",
"GPTQ-, AWQ- und GGUF-Modelle von Hugging Face"
]
},
"en": {
"description": "Highly versatile web interface built with Gradio, supporting multiple inference engines (llama.cpp, ExLlama, Transformers). Popular among advanced users who want to fine-tune generation parameters in detail.",
"license": "Free, open source (AGPLv3)",
"models": [
"Llama 3.x and CodeLlama (Meta)",
"Mistral and Mixtral (Mistral AI)",
"Nous Hermes and other community fine-tunes",
"Qwen 2.5 and DeepSeek",
"GPTQ, AWQ, and GGUF models from Hugging Face"
]
},
"es": {
"description": "Interfaz web muy versátil en Gradio, con soporte para múltiples motores de inferencia (llama.cpp, ExLlama, Transformers). Popular entre usuarios avanzados que quieren ajustar los parámetros de generación al detalle.",
"license": "Gratuito, código abierto (AGPLv3)",
"models": [
"Llama 3.x y CodeLlama (Meta)",
"Mistral y Mixtral (Mistral AI)",
"Nous Hermes y otros ajustes finos de la comunidad",
"Qwen 2.5 y DeepSeek",
"Modelos GPTQ, AWQ y GGUF de Hugging Face"
]
},
"fr": {
"description": "Interface web très polyvalente en Gradio, prenant en charge plusieurs moteurs d'inférence (llama.cpp, ExLlama, Transformers). Populaire auprès des utilisateurs avancés souhaitant régler finement les paramètres de génération.",
"license": "Gratuit, open source (AGPLv3)",
"models": [
"Llama 3.x et CodeLlama (Meta)",
"Mistral et Mixtral (Mistral AI)",
"Nous Hermes et d'autres fine-tunings communautaires",
"Qwen 2.5 et DeepSeek",
"Modèles GPTQ, AWQ et GGUF depuis Hugging Face"
]
},
"zh": {
"description": "基于 Gradio 构建的高度灵活的网页界面，支持多种推理引擎（llama.cpp、ExLlama、Transformers）。深受希望精细调整生成参数的高级用户欢迎。",
"license": "免费，开源（AGPLv3）",
"models": [
"Llama 3.x 和 CodeLlama（Meta）",
"Mistral 和 Mixtral（Mistral AI）",
"Nous Hermes 及其他社区微调版本",
"Qwen 2.5 和 DeepSeek",
"来自 Hugging Face 的 GPTQ、AWQ 和 GGUF 模型"
]
}
}
};

export function localizedSoftware(sw: LocalLlmSoftware, lang: LanguageCode): LocalLlmTranslation {
  const tr = localLlmI18n[sw.id]?.[lang];
  return {
    description: tr?.description ?? sw.description,
    license: tr?.license ?? sw.license,
    models: tr?.models ?? sw.models,
  };
}
