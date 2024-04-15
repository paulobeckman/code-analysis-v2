/* eslint-disable @typescript-eslint/no-explicit-any */
import * as nearley from "nearley";
import { useState } from "react";
import Button from "src/components/Button";
import Card from "src/components/Card";
import grammar from "src/utils/grammar/grammar.js";

export function Component() {
  const [testInput, setTestInput] = useState("");
  const [result, setResult] = useState<any | null>();
  const [error, setError] = useState(false);

  const handleTestInputChange = (event: any) => {
    setTestInput(event.target.value);
  };

  const handleTestClick = () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    setError(false);
    try {
      parser.feed(testInput);
      setResult(parser.results as any);
      console.log(parser.results);
    } catch (error: any) {
      setResult("Erro de análise sintática: " + error.message);
      setError(true);
    }
  };

  return (
    <>
      <Card>
        <h1 className="text-center font-bold text-xl mb-5">
          Analisador Sintático
        </h1>
        <h1>Editor de Teste</h1>
        <div className="flex flex-col gap-4">
          <textarea
            className="bg-gray-50 border border-gray-300 rounded-md px-2 py-1 outline-slate-500"
            value={testInput}
            onChange={handleTestInputChange}
            placeholder="EX.: #ffffff, rgb (255, 255, 255), rgba (255, 255, 255, 1), hsl(1, 2, 4), hsla(120, 100%, 50%, 1)"
          />
        </div>
        <div className="mt-2 flex justify-center">
          <Button type="button" onClick={handleTestClick}>
            Testar Gramática
          </Button>
        </div>

        {result?.length > 0 && (
          <div className="p-4 bg-white border border-gray-200 sm:px-6 lg:px-8 sm:m-4 sm:rounded-lg">
            <p className="pb-4 text-center font-bold text-lg">Resultado</p>
            <div className="flex gap-2 items-center justify-center">
              <Card>
                {!error ? (
                  <p>
                    Sucesso na análise sintática: <b>{result}</b>
                  </p>
                ) : (
                  <p>{result}</p>
                )}
              </Card>
            </div>
          </div>
        )}
      </Card>

      <h1 className="text-center font-bold text-xl mb-5 mt-16">
        Diagrama da Gramática
      </h1>
      <img
        src="/railroad-diagrams.png"
        alt="railroad-diagrams"
        className="mb-5"
      />
    </>
  );
}

Component.displayName = "Grammar";
