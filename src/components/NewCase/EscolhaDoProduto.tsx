import {
  Checkbox,
  useBreakpointValue,
  VStack,
  Text,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';

interface EscolhaDoProdutoProps {
  handleSubmitData: (value: { productPropose: string }) => Promise<void>;
}

const plans = [
  {
    id: '196626103-7e1a63dc-1dc2-47fa-9084-d4708ff2423f',
    name: 'Plano Fast - Wise Aligners',
  },
  {
    id: '196626103-dbac1459-2e1e-4301-815d-a9c6885cc321',
    name: 'Plano Confort - Wise Aligners',
  },
  {
    id: '196626103-b5177cb6-9f7a-42e3-aeb1-2305ac0d26cd',
    name: 'Plano Plus - Wise Aligners',
  },
  {
    id: '196626103-3b61d179-cf57-49b5-bafa-dd6a99cca59a',
    name: 'Plano Infinity - Wise Aligners',
  },
  {
    id: '196626103-e6782644-cf2e-4311-aec6-e7eb55e58c4f',
    name: 'Plano Restart - Wise Aligners',
  },
  {
    id: '196626103-a7a192f7-8471-4dc3-a794-e7b7745c6496',
    name: 'Contenção - Wise Aligners',
  },
  {
    id: '196626103-9c55b3aa-1584-4fcd-af63-38732ef3af7e',
    name: 'Wise Aligners IDB (01 Arcada) Guia de Colagem indireta',
  },
  {
    id: '196626103-b0a4fca2-c419-4a50-8b7d-d69786b624cc',
    name: 'Wise Aligners IDB (02 arcadas) Guia de colagem indireta',
  },
  {
    id: '196626103-0f5f6d13-8fcb-42d0-8df1-340978710420',
    name: 'Set Up virtual de Alinhadores Wise Aligners',
  },
];

const contract =
  'https://firebasestorage.googleapis.com/v0/b/wisealigners-d1c0c.appspot.com/o/Contrato%20de%20Presta%C3%A7%C3%A3o%20de%20Servi%C3%A7os%20e%20Compra%20Wise%20Aligners%C2%AE.pdf?alt=media&token=ef4f002b-e77d-4d3c-8e2d-e28959b359fd';

export function EscolhaDoProduto({ handleSubmitData }: EscolhaDoProdutoProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const checkBoxSize = useBreakpointValue({
    lg: 'md',
    sm: 'sm',
  });

  async function handleSelectProduct(product: string) {
    setButtonLoading(true);
    await handleSubmitData({ productPropose: product });
    setButtonLoading(false);
  }

  return (
    <VStack align="flex-start" spacing={6} w="100%">
      <Checkbox onChange={event => setIsChecked(event.target.checked)}>
        Li e aceito os termos do{' '}
        <Text
          color="blue.500"
          as="a"
          textDecoration="underline"
          href={contract}
          target="_blank"
          rel="noreferrer"
        >
          contrato de adesão
        </Text>
      </Checkbox>
      {plans.map(plan => (
        <a
          key={plan.id}
          href={`https://www.mercadopago.com.br/payment-link/v1/redirect?preference-id=${plan.id}&source=link`}
          target="_blank"
          rel="noreferrer"
        >
          <Button
            size={checkBoxSize}
            fontSize={['sm', 'sm', 'lg']}
            isLoading={buttonLoading}
            whiteSpace="normal"
            py={1}
            variant="outline"
            borderRadius={3}
            disabled={!isChecked}
            onClick={() => handleSelectProduct(plan.name)}
          >
            {plan.name}
          </Button>
        </a>
      ))}
    </VStack>
  );
}
