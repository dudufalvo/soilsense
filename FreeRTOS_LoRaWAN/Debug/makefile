################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (12.3.rel1)
################################################################################

-include ../makefile.init

RM := rm -rf

# All of the sources participating in the build are defined here
-include sources.mk
-include Utilities/subdir.mk
-include Middlewares/littlefs/subdir.mk
-include Middlewares/SubGHz_Phy/stm32_radio_driver/subdir.mk
-include Middlewares/LoRaWAN/Utilities/subdir.mk
-include Middlewares/LoRaWAN/Mac/Region/subdir.mk
-include Middlewares/LoRaWAN/Mac/subdir.mk
-include Middlewares/LoRaWAN/LmHandler/Packages/subdir.mk
-include Middlewares/LoRaWAN/LmHandler/subdir.mk
-include Middlewares/LoRaWAN/Crypto/subdir.mk
-include Middlewares/FreeRTOS/prortable/MemMang/subdir.mk
-include Middlewares/FreeRTOS/prortable/GCC/ARM_CM3/subdir.mk
-include Middlewares/FreeRTOS/CMSIS_RTOS/subdir.mk
-include Middlewares/FreeRTOS/subdir.mk
-include LoRaWAN/Target/subdir.mk
-include LoRaWAN/App/subdir.mk
-include Drivers/STM32WLxx_HAL_Driver/subdir.mk
-include Drivers/BSP/subdir.mk
-include Core/Startup/subdir.mk
-include Core/Src/subdir.mk
-include objects.mk

ifneq ($(MAKECMDGOALS),clean)
ifneq ($(strip $(S_DEPS)),)
-include $(S_DEPS)
endif
ifneq ($(strip $(S_UPPER_DEPS)),)
-include $(S_UPPER_DEPS)
endif
ifneq ($(strip $(C_DEPS)),)
-include $(C_DEPS)
endif
endif

-include ../makefile.defs

OPTIONAL_TOOL_DEPS := \
$(wildcard ../makefile.defs) \
$(wildcard ../makefile.init) \
$(wildcard ../makefile.targets) \


BUILD_ARTIFACT_NAME := FreeRTOS_LoRaWAN
BUILD_ARTIFACT_EXTENSION := elf
BUILD_ARTIFACT_PREFIX :=
BUILD_ARTIFACT := $(BUILD_ARTIFACT_PREFIX)$(BUILD_ARTIFACT_NAME)$(if $(BUILD_ARTIFACT_EXTENSION),.$(BUILD_ARTIFACT_EXTENSION),)

# Add inputs and outputs from these tool invocations to the build variables 
EXECUTABLES += \
FreeRTOS_LoRaWAN.elf \

MAP_FILES += \
FreeRTOS_LoRaWAN.map \

SIZE_OUTPUT += \
default.size.stdout \

OBJDUMP_LIST += \
FreeRTOS_LoRaWAN.list \

OBJCOPY_HEX += \
FreeRTOS_LoRaWAN.hex \

OBJCOPY_BIN += \
FreeRTOS_LoRaWAN.bin \


# All Target
all: main-build

# Main-build Target
main-build: FreeRTOS_LoRaWAN.elf secondary-outputs

# Tool invocations
FreeRTOS_LoRaWAN.elf FreeRTOS_LoRaWAN.map: $(OBJS) $(USER_OBJS) /Users/gabrielsilva/UC/3Ano/2\ Semestre/Projeto\ 2/LoRaWan-E5-Node-main/Projects/Applications/FreeRTOS/FreeRTOS_LoRaWAN/STM32WLE5JCIX_FLASH.ld makefile objects.list $(OPTIONAL_TOOL_DEPS)
	arm-none-eabi-gcc -o "FreeRTOS_LoRaWAN.elf" @"objects.list" $(USER_OBJS) $(LIBS) -mcpu=cortex-m4 -T"/Users/gabrielsilva/UC/3Ano/2 Semestre/Projeto 2/LoRaWan-E5-Node-main/Projects/Applications/FreeRTOS/FreeRTOS_LoRaWAN/STM32WLE5JCIX_FLASH.ld" --specs=nosys.specs -Wl,-Map="FreeRTOS_LoRaWAN.map" -Wl,--gc-sections -static --specs=nano.specs -mfloat-abi=soft -mthumb -Wl,--start-group -lc -lm -Wl,--end-group
	@echo 'Finished building target: $@'
	@echo ' '

default.size.stdout: $(EXECUTABLES) makefile objects.list $(OPTIONAL_TOOL_DEPS)
	arm-none-eabi-size  $(EXECUTABLES)
	@echo 'Finished building: $@'
	@echo ' '

FreeRTOS_LoRaWAN.list: $(EXECUTABLES) makefile objects.list $(OPTIONAL_TOOL_DEPS)
	arm-none-eabi-objdump -h -S $(EXECUTABLES) > "FreeRTOS_LoRaWAN.list"
	@echo 'Finished building: $@'
	@echo ' '

FreeRTOS_LoRaWAN.hex: $(EXECUTABLES) makefile objects.list $(OPTIONAL_TOOL_DEPS)
	arm-none-eabi-objcopy  -O ihex $(EXECUTABLES) "FreeRTOS_LoRaWAN.hex"
	@echo 'Finished building: $@'
	@echo ' '

FreeRTOS_LoRaWAN.bin: $(EXECUTABLES) makefile objects.list $(OPTIONAL_TOOL_DEPS)
	arm-none-eabi-objcopy  -O binary $(EXECUTABLES) "FreeRTOS_LoRaWAN.bin"
	@echo 'Finished building: $@'
	@echo ' '

# Other Targets
clean:
	-$(RM) FreeRTOS_LoRaWAN.bin FreeRTOS_LoRaWAN.elf FreeRTOS_LoRaWAN.hex FreeRTOS_LoRaWAN.list FreeRTOS_LoRaWAN.map default.size.stdout
	-@echo ' '

secondary-outputs: $(SIZE_OUTPUT) $(OBJDUMP_LIST) $(OBJCOPY_HEX) $(OBJCOPY_BIN)

fail-specified-linker-script-missing:
	@echo 'Error: Cannot find the specified linker script. Check the linker settings in the build configuration.'
	@exit 2

warn-no-linker-script-specified:
	@echo 'Warning: No linker script specified. Check the linker settings in the build configuration.'

.PHONY: all clean dependents main-build fail-specified-linker-script-missing warn-no-linker-script-specified

-include ../makefile.targets
