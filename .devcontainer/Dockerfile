# Make sure NODE_VERSION matches the Node.js version you want to use
ARG NODE_VERSION=24
FROM mcr.microsoft.com/devcontainers/javascript-node:$NODE_VERSION

USER root

# Install packages needed to build and run the application
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    make \
    g++ \
    git

RUN corepack enable

# --- Custom setup
USER node

RUN git clone https://github.com/zsh-users/zsh-autosuggestions \
    ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

RUN sed -ir 's/plugins=(git)/plugins=(git zsh-autosuggestions)/g' ~/.zshrc && \
    sudo chsh -s $(which zsh) $(whoami)
# ---
