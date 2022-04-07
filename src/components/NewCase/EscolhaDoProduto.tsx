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
      <a href="https://www.google.com" target="_blank" rel="noreferrer">
        <Button
          isLoading={buttonLoading}
          onClick={() => handleSelectProduct('Produto 1')}
        >
          Produto 1
        </Button>
      </a>
      <a href="https://www.google.com" target="_blank" rel="noreferrer">
        <Button
          isLoading={buttonLoading}
          onClick={() => handleSelectProduct('Produto 2')}
        >
          Produto 2
        </Button>
      </a>
    </Flex>
  );
}
