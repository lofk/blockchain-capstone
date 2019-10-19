FROM zokrates/zokrates:latest

COPY ./zokrates/code /home/zokrates/code

RUN ./zokrates compile -i code/square/square.code && \
    ./zokrates setup && \
    ./zokrates compute-witness -a 3 9 && \
    ./zokrates generate-proof && \
    ./zokrates export-verifier

VOLUME /home/zokrates