import { Box, Button, Flex } from "@chakra-ui/react";
import {
  useCreatedKeysQuery,
  useDeleteKeyMutation,
} from "../../../redux/api/key";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import style from "./index.module.css";
const Sales = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: response } = useCreatedKeysQuery({
    page: Number(searchParams.get("page")) || 1,
    size: 10,
  });
  const [deleteKey, { isError, isLoading }] = useDeleteKeyMutation();
  return (
    <Box>
      {isError && <div>Something went wrong</div>}
      {response && (
        <>
          {response.data?.map((key) => (
            <Flex
              justify={"center"}
              align={"center"}
              width={"100%"}
              key={key.id}
            >
              {key.name}
              <Button variant="contained" color="primary">
                Edit
              </Button>
              <Button
                disabled={isLoading}
                onClick={() => deleteKey(key.id)}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </Flex>
          ))}
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            className={style.pagination}
            breakClassName={"break-me"}
            pageCount={response ? response.pagination.pageCount : 1}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(data) =>
              setSearchParams((prev) => ({ ...prev, page: data.selected + 1 }))
            }
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </>
      )}
    </Box>
  );
};

export default Sales;
