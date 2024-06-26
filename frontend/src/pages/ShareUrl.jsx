import {
  CopyButton,
  Tooltip,
  ActionIcon,
  Text,
  rem,
  Flex,
  Container,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { FaCheck, FaCopy } from "react-icons/fa";

const Copy = ({url}) => {
  return (
    <CopyButton value={url} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
          <ActionIcon
            color={copied ? "#00492B": "gray"}
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
  const {productId} = useParams();
  const uri = new URL(window.location.href);

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
        <Text fw={500} truncate="end">
          {`${uri.origin}/gest/products/${productId}`}
        </Text>

        <Copy url={`${uri.origin}/gest/products/${productId}`} />
      </Flex>
    </Container>
  );
};
