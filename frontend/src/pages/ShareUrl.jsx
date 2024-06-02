import {
  CopyButton,
  Tooltip,
  ActionIcon,
  Text,
  rem,
  Flex,
  Container,
} from "@mantine/core";
import { FaCheck, FaCopy } from "react-icons/fa";

const Copy = () => {
  return (
    <CopyButton value="コピーしたURLです。" timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
          <ActionIcon
            color={copied ? "indigo" : "gray"}
            variant="subtle"
            onClick={copy}
          >
            {copied ? (
              <FaCheck style={{ width: rem(16) }} />
            ) : (
              <FaCopy style={{ width: rem(16) }} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};

export const ShareUrl = () => {
  //   const clipboard = useClipboard();
  return (
    <Container align="center" justify="center" fluid>
      <Text size="lg">
        リンクを共有して
        <br />
        ゲームに参加してもらおう！！
      </Text>
      <Flex
        mih={50}
        gap="xs"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <h4>コピーしてください</h4>
        <Copy />
      </Flex>
    </Container>
  );
};
