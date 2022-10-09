import {
  Button,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ScaleFade,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Octokit } from "@octokit/rest";
import { ChangeEvent, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useToastMessage } from "./hooks/useToastMessage";

const EyeIcon = chakra(BsEye);
const EyeSlashIcon = chakra(BsEyeSlash);

export const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showMessage } = useToastMessage();

  const [exportRepoOwner, setExportRepoOwner] = useState("");
  const [exportRepoName, setExportRepoName] = useState("");
  const [importRepoOwner, setImportRepoOwner] = useState("");
  const [importRepoName, setImportRepoName] = useState("");
  const [githubAccessToken, setGithubAccessToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeExportRepoOwner = (e: ChangeEvent<HTMLInputElement>) =>
    setExportRepoOwner(e.target.value);
  const onChangeExportRepoName = (e: ChangeEvent<HTMLInputElement>) =>
    setExportRepoName(e.target.value);
  const onChangeImportRepoOwner = (e: ChangeEvent<HTMLInputElement>) =>
    setImportRepoOwner(e.target.value);
  const onChangeImportRepoName = (e: ChangeEvent<HTMLInputElement>) =>
    setImportRepoName(e.target.value);
  const onChangeGithubAccessToken = (e: ChangeEvent<HTMLInputElement>) =>
    setGithubAccessToken(e.target.value);

  const onClickRunButton = () => {
    const octokit = new Octokit({
      auth: githubAccessToken,
    });

    const getLabels = async (isExport = true) => {
      const owner = isExport ? exportRepoOwner : importRepoOwner;
      const repo = isExport ? exportRepoName : importRepoName;
      const res = await octokit
        .request("GET /repos/{owner}/{repo}/labels", {
          owner,
          repo,
        })
        .then((res) => res.data);
      return res;
    };

    type Label = {
      id: number;
      node_id: string;
      url: string;
      name: string;
      description: string | null;
      color: string;
      default: boolean;
    };

    const deleteLabel = async (delLabels: Label[] = []) => {
      delLabels.forEach(async (dl) => {
        const name = dl.name;
        await octokit.request("DELETE /repos/{owner}/{repo}/labels/{name}", {
          owner: importRepoOwner,
          repo: importRepoName,
          name,
        });
      });
    };

    const postLabel = async (registerLabels: Label[] = []) => {
      registerLabels.forEach(async (rl) => {
        const { name, description, color } = rl;
        await octokit.request("POST /repos/{owner}/{repo}/labels", {
          owner: importRepoOwner,
          repo: importRepoName,
          name,
          description: description as string,
          color,
        });
      });
    };

    const main = async () => {
      setIsLoading(true);
      try {
        const delLabels = await getLabels(false); // インポート先の既存ラベルをエクスポート
        await deleteLabel(delLabels); // インポート先の既存ラベルを削除
        const registerLabels = await getLabels(true); // ラベルをエクスポート
        await postLabel(registerLabels); // ラベルをインポート
        onOpen();
      } catch (e: any) {
        console.error(e);
        if (e.response === undefined) {
          showMessage({
            title: "Internet disconnected",
            description: "Please check your internet connection",
            status: "error",
          });
        } else {
          showMessage({
            title: `${e.response.status} Error`,
            description: e.message as string,
            status: "error",
          });
        }
      }
      setIsLoading(false);
    };

    main();
  };

  const onClickResultButton = () => {
    window.open(
      `https://github.com/${exportRepoOwner}/${exportRepoName}/labels`
    );
  };

  return (
    <>
      <ScaleFade initialScale={0.9} in>
        <Flex
          alignItems="center"
          justifyContent="center"
          bg="gray.100"
          height="100vh"
        >
          <Stack
            w={600}
            boxShadow="md"
            borderRadius={15}
            spacing={4}
            p={4}
            mb={60}
            bg="white"
          >
            <Text fontSize="xl" fontWeight="bold" textAlign="center" mb="22px">
              GitHub Labels Export Import
            </Text>
            <Stack spacing={5} direction="row"></Stack>
            <FormControl>
              <FormLabel>Export repository owner</FormLabel>
              <Input
                type="text"
                value={exportRepoOwner}
                onChange={onChangeExportRepoOwner}
                disabled={isLoading}
                placeholder="octocat"
              />
              <FormLabel>Export repository name</FormLabel>
              <Input
                type="text"
                value={exportRepoName}
                onChange={onChangeExportRepoName}
                disabled={isLoading}
                placeholder="repo"
              />
              <FormLabel>Import repository owner</FormLabel>
              <Input
                type="text"
                value={importRepoOwner}
                onChange={onChangeImportRepoOwner}
                disabled={isLoading}
                placeholder="octopus"
              />
              <FormLabel>Import repository name</FormLabel>
              <Input
                type="text"
                value={importRepoName}
                onChange={onChangeImportRepoName}
                disabled={isLoading}
                placeholder="repo"
              />
              <FormLabel>Token</FormLabel>
              <Flex>
                <Input
                  type={showToken ? "text" : "password"}
                  value={githubAccessToken}
                  onChange={onChangeGithubAccessToken}
                  disabled={isLoading}
                  placeholder="Your GitHub access token"
                />
                <IconButton
                  aria-label="showButton"
                  icon={showToken ? <EyeSlashIcon /> : <EyeIcon />}
                  disabled={isLoading}
                  onClick={() => setShowToken(!showToken)}
                />
              </Flex>
            </FormControl>
            <Button
              colorScheme="blue"
              onClick={onClickRunButton}
              isLoading={isLoading}
              disabled={
                exportRepoOwner === "" ||
                exportRepoName === "" ||
                importRepoOwner === "" ||
                importRepoName === "" ||
                githubAccessToken === "" ||
                isLoading
              }
            >
              Run
            </Button>
          </Stack>
        </Flex>
      </ScaleFade>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success!!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>You've successfully imported the labels!</ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={onClickResultButton}>
              Check the results
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
