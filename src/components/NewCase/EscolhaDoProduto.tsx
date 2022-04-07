import { Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { Button } from '../Button';

interface EscolhaDoProdutoProps {
  handleSubmitData: (value: { productPropose: string }) => Promise<void>;
}

export function EscolhaDoProduto({ handleSubmitData }: EscolhaDoProdutoProps) {
  const [buttonLoading, setButtonLoading] = useState(false);

  async function handleSelectProduct(product: string) {
    setButtonLoading(true);
    await handleSubmitData({ productPropose: product });
    setButtonLoading(false);
  }

  return (
    <Flex p={[2, 8]} w="100%" justifyContent="space-around">
      <a
        href="https://wisealigners.vercel.app/"
        target="_blank"
        rel="noreferrer"
      >
        <Button
          isLoading={buttonLoading}
          onClick={() =>
            handleSelectProduct('Tratamento completo (Setup + alinhadores)')
          }
        >
          Tratamento completo (Setup + alinhadores)
        </Button>
      </a>
      <a
        href="https://wisealigners.vercel.app/"
        target="_blank"
        rel="noreferrer"
      >
        <Button
          isLoading={buttonLoading}
          onClick={() => handleSelectProduct('Somente setup')}
        >
          Somente setup
        </Button>
      </a>
    </Flex>
  );
}
