"use client";

import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { MdOutlineMuseum } from "react-icons/md";
import { LuCalendar } from "react-icons/lu";
import { IoCheckmarkCircle, IoEllipseOutline, IoTrashOutline } from "react-icons/io5";
import { Route, useRoutes } from "../context/RoutesContext";

interface RouteCardProps extends Route {
  onClick?: () => void;
  isSelected?: boolean;
}

export default function RouteCard(props: RouteCardProps) {
  const { id, name, museums, date, stopsCount, isCompleted, onClick, isSelected } = props;
  const { toggleRouteCompletion, deleteRoute } = useRoutes();

  const displayMuseums =
    museums.length > 2
      ? "Multiple museums"
      : museums.length > 0
      ? museums.join(" • ")
      : "None";

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      bg="brand.surface"
      p="5"
      shadow="sm"
      borderColor={isSelected ? "brand.primary" : "brand.border"}
      w="full"
      _hover={{ shadow: "md", borderColor: isSelected ? "brand.primaryHover" : "brand.primary" }}
      transition="all 0.2s"
      cursor="pointer"
      role="button"
      tabIndex={0}
      aria-label={`Select route ${name}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <Text fontSize="xl" fontWeight="bold" mb="3" title={name}>{name}</Text>
      <Flex justify="space-between" align="flex-end">
        <Flex direction="column" gap="2" color="gray.600" fontSize="sm">
          <Flex align="flex-start" gap="2">
            <Icon as={MdOutlineMuseum} boxSize="4" mt={0.5} color="brand.primaryText" />
            <Text color="brand.primaryText">{displayMuseums}</Text>
          </Flex>
          <Flex align="center" gap="1">
            <Icon as={LuCalendar} boxSize="4" />
            <Text mr="13px" color="brand.primaryText">{date}</Text>
           
            <Text color="brand.primaryText">  •  {stopsCount} stop{stopsCount !== 1 ? "s" : ""}</Text>
          </Flex>
        </Flex>
        <Flex align="center" gap="4">
          <Flex
            role="button"
            tabIndex={0}
            aria-label={isCompleted ? "Mark route as incomplete" : "Mark route as complete"}
            align="center"
            gap="2"
            onClick={(e) => {
              e.stopPropagation();
              toggleRouteCompletion(id);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                toggleRouteCompletion(id);
              }
            }}
            transition="all 0.2s ease"
            
            _hover={{ color: "#806b50", transform: "translateY(-2px)",
                       }}
            color={"#b5956a"}
          >
            <Text fontSize="sm" display={{ base: "none", md: "block" }}>{isCompleted ? "Completed" : "Mark as complete"}</Text>
            <Icon as={isCompleted ? IoCheckmarkCircle : IoEllipseOutline} boxSize="5" />
          </Flex>
        <Icon
          role="button"
          tabIndex={0}
          aria-label={`Delete route ${name}`}
          as={IoTrashOutline}
          boxSize="5"
          color="red.400"
          _hover={{ color: "red.600" }}
          onClick={(e) => {
            e.stopPropagation();
            deleteRoute(id);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              deleteRoute(id);
            }
          }}
        />
        </Flex>
      </Flex>
    </Box>
  );
}