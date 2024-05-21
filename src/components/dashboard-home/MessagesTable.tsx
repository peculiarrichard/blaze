"use client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
} from "@chakra-ui/react";
import { getAllScheduledMessages } from "@/api-service/schedule-messages/getAllScheduledMessages";
import useSWR from "swr";
import { RiProgress5Line } from "react-icons/ri";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { getRelativeTimeFormat } from "@/utils/GetRelativeTimeFormat";
import { ActionsMenu } from "./ActionsMenu";
import { AllMessages } from "@/models/api/schedule/allMessages";
import { GiCancel } from "react-icons/gi";

export const MessagesTable = () => {
  const { data, isLoading, error } = useSWR(
    "getAllScheduledMessages",
    getAllScheduledMessages
  );

  const isDateTimeBeforeNow = (dateStr: string, timeStr: string) => {
    const combinedDateTimeStr = `${dateStr}T${timeStr}:00`;
    const combinedDateTime = new Date(combinedDateTimeStr);
    const currentDateTime = new Date();
    return combinedDateTime < currentDateTime;
  };

  return (
    <>
      <div className="my-10">
        <h2 className="flex flex-col text-base gap-y-3">
          All scheduled messages
          <span className="text-sm font-bold mb-6">
            {data && data.length > 0 ? `(${data?.length})` : 0} total
          </span>
        </h2>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th className="capitalize">Message subject</Th>
                <Th className="capitalize">Message body</Th>
                <Th className="capitalize">Platform</Th>
                <Th className="capitalize">Contact</Th>
                <Th className="capitalize">Scheduled at</Th>
                <Th className="capitalize">Delivery date</Th>
                <Th className="capitalize">Status</Th>
                <Th className="capitalize">Action</Th>
              </Tr>
            </Thead>
            <Tbody className="text-[0.9rem]">
              {isLoading ? (
                <Tr>
                  <Td colSpan={4}>
                    <Spinner />
                  </Td>
                </Tr>
              ) : error ? (
                <Tr>
                  <Td colSpan={4}>
                    <p>{error.message}</p>
                  </Td>
                </Tr>
              ) : data && data.length > 0 ? (
                data
                  .sort((a: any, b: any) =>
                    b.createdAt > a.createdAt ? 1 : -1
                  )
                  .map((message: AllMessages) => (
                    <Tr key={message._id}>
                      <Td>
                        <p className="text-wrap">{message.subject}</p>
                      </Td>
                      <Td>
                        <p className="text-wrap line-clamp-2">{message.text}</p>
                      </Td>
                      <Td>{message.platform}</Td>
                      <Td>{message.contact}</Td>
                      <Td>{getRelativeTimeFormat(message.createdAt)}</Td>
                      <Td>
                        {message.date}, {message.time}
                      </Td>
                      <Td>
                        {message.status === "success" ? (
                          <p className="text-green-800 bg-green-600 p-1 rounded flex gap-1 items-center">
                            Delivered{" "}
                            <span>
                              <IoCheckmarkDoneCircleOutline />
                            </span>
                          </p>
                        ) : message.status === "cancelled" ? (
                          <p className="text-red-600 bg-red-300 p-1 rounded flex gap-1 items-center">
                            Cancelled{" "}
                            <span>
                              <GiCancel />
                            </span>
                          </p>
                        ) : (
                          <p className="text-blue-600 bg-blue-300 p-1 rounded flex gap-1 items-center">
                            Pending{" "}
                            <span>
                              <RiProgress5Line />
                            </span>
                          </p>
                        )}
                      </Td>
                      <Td>
                        {isDateTimeBeforeNow(message.date, message.time) ? (
                          <div>No Action</div>
                        ) : (
                          <ActionsMenu message={message} />
                        )}
                      </Td>
                    </Tr>
                  ))
              ) : (
                <Tr>
                  <Td colSpan={4}>
                    <p>No messages found</p>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
