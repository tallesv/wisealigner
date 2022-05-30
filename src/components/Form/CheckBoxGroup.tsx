import { HStack, VStack, Stack, Text, Checkbox } from '@chakra-ui/react';

interface CheckBoxGroupProps {
  itensSelected?: string[];
  isDefaultSize: boolean | undefined;
  isDisabled?: boolean;
  checkBoxSize: string | undefined;
  onSelect: (value: string) => void;
}

export function CheckBoxGroup({
  itensSelected,
  isDefaultSize,
  isDisabled,
  checkBoxSize,
  onSelect,
}: CheckBoxGroupProps) {
  function handleSelect(value: string) {
    onSelect(value);
  }
  return (
    <HStack spacing={3}>
      {isDefaultSize && (
        <Text fontSize={50} fontWeight={500}>
          D
        </Text>
      )}
      <Stack direction={!isDefaultSize ? 'column' : 'row'} align="center">
        <Stack direction={['column', 'column', 'row']}>
          {!isDefaultSize && (
            <Text fontSize={[20, 30, 40]} fontWeight={500}>
              D
            </Text>
          )}
          <VStack spacing={1}>
            <HStack spacing={[0, 2]}>
              {['1.8', '1.7', '1.6', '1.5', '1.4', '1.3', '1.2', '1.1'].map(
                item => (
                  <Checkbox
                    key={item}
                    isDisabled={isDisabled}
                    value={item}
                    onChange={e => handleSelect(e.target.value)}
                    size={checkBoxSize}
                    defaultChecked={itensSelected?.includes(item)}
                  >
                    {item}
                  </Checkbox>
                ),
              )}
            </HStack>
            <HStack spacing={[0, 2]}>
              {['4.8', '4.7', '4.6', '4.5', '4.4', '4.3', '4.2', '4.1'].map(
                item => (
                  <Checkbox
                    key={item}
                    isDisabled={isDisabled}
                    value={item}
                    onChange={e => handleSelect(e.target.value)}
                    size={checkBoxSize}
                    defaultChecked={itensSelected?.includes(item)}
                  >
                    {item}
                  </Checkbox>
                ),
              )}
            </HStack>
          </VStack>
        </Stack>

        <Stack direction={['column', 'column', 'row']}>
          <VStack spacing={1}>
            <HStack spacing={[0, 2]}>
              {['2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8'].map(
                item => (
                  <Checkbox
                    key={item}
                    isDisabled={isDisabled}
                    value={item}
                    onChange={e => handleSelect(e.target.value)}
                    size={checkBoxSize}
                    defaultChecked={itensSelected?.includes(item)}
                  >
                    {item}
                  </Checkbox>
                ),
              )}
            </HStack>
            <HStack spacing={[0, 2]}>
              {['3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8'].map(
                item => (
                  <Checkbox
                    key={item}
                    isDisabled={isDisabled}
                    value={item}
                    onChange={e => handleSelect(e.target.value)}
                    size={checkBoxSize}
                    defaultChecked={itensSelected?.includes(item)}
                  >
                    {item}
                  </Checkbox>
                ),
              )}
            </HStack>
          </VStack>
          {!isDefaultSize && (
            <Text fontSize={[20, 30, 40]} fontWeight={500}>
              E
            </Text>
          )}
        </Stack>
      </Stack>
      {isDefaultSize && (
        <Text fontSize={50} fontWeight={500}>
          E
        </Text>
      )}
    </HStack>
  );
}
