################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (12.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
/Users/gabrielsilva/UC/3Ano/2\ Semestre/Projeto\ 2/LoRaWan-E5-Node-main/Middlewares/Third_Party/FreeRTOS/Source/portable/MemMang/heap_4.c 

OBJS += \
./Middlewares/FreeRTOS/prortable/MemMang/heap_4.o 

C_DEPS += \
./Middlewares/FreeRTOS/prortable/MemMang/heap_4.d 


# Each subdirectory must supply rules for building sources it contributes
Middlewares/FreeRTOS/prortable/MemMang/heap_4.o: /Users/gabrielsilva/UC/3Ano/2\ Semestre/Projeto\ 2/LoRaWan-E5-Node-main/Middlewares/Third_Party/FreeRTOS/Source/portable/MemMang/heap_4.c Middlewares/FreeRTOS/prortable/MemMang/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m4 -std=gnu11 -g3 -DCORE_CM4 -DUSE_HAL_DRIVER -DSTM32WLE5xx -DDEBUG -c -I../Core/Inc -I../../../../../Drivers/STM32WLxx_HAL_Driver/Inc -I../../../../../Drivers/STM32WLxx_HAL_Driver/Inc/Legacy -I../../../../../Drivers/CMSIS/Device/ST/STM32WLxx/Include -I../../../../../Drivers/CMSIS/Include -I../../../../../Middlewares/Third_Party/FreeRTOS/Source/include -I../../../../../Middlewares/Third_Party/FreeRTOS/Source/portable/GCC/ARM_CM3 -I../../../../../Middlewares/Third_Party/LoRaWAN/Crypto -I../../../../../Middlewares/Third_Party/LoRaWAN/LmHandler -I../../../../../Middlewares/Third_Party/LoRaWAN/Mac -I../../../../../Middlewares/Third_Party/LoRaWAN/Utilities -I../../../../../Middlewares/Third_Party/SubGHz_Phy/stm32_radio_driver -I../../../../../Middlewares/Third_Party/SubGHz_Phy -I../../../../../Drivers/BSP/STM32WLxx_LoRa_E5_mini -I../../../../../Utilities/lpm/tiny_lpm -I../../../../../Utilities/misc -I../../../../../Utilities/sequencer -I../../../../../Utilities/timer -I../../../../../Utilities/trace/adv_trace -I../../../../../Middlewares/Third_Party/LoRaWAN/Mac/Region -I../../../../../Middlewares/Third_Party/LoRaWAN/LmHandler/Packages -I../../../../../Middlewares/Third_Party/FreeRTOS/Source/CMSIS_RTOS -I../../../../../Projects/Applications/FreeRTOS/FreeRTOS_LoRaWAN/LoRaWAN/App -I../../../../../Projects/Applications/FreeRTOS/FreeRTOS_LoRaWAN/LoRaWAN/Target -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"Middlewares/FreeRTOS/prortable/MemMang/heap_4.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

clean: clean-Middlewares-2f-FreeRTOS-2f-prortable-2f-MemMang

clean-Middlewares-2f-FreeRTOS-2f-prortable-2f-MemMang:
	-$(RM) ./Middlewares/FreeRTOS/prortable/MemMang/heap_4.cyclo ./Middlewares/FreeRTOS/prortable/MemMang/heap_4.d ./Middlewares/FreeRTOS/prortable/MemMang/heap_4.o ./Middlewares/FreeRTOS/prortable/MemMang/heap_4.su

.PHONY: clean-Middlewares-2f-FreeRTOS-2f-prortable-2f-MemMang

