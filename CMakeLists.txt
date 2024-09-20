cmake_minimum_required(VERSION 3.0.0)
project(BabylonTSApp VERSION 0.1.0)

add_subdirectory(Dependencies)

add_executable(${CMAKE_PROJECT_NAME} main.cpp)

target_link_libraries(${CMAKE_PROJECT_NAME}
    PRIVATE AppRuntime
    PRIVATE NativeEngine
    PRIVATE NativeInput
    PRIVATE NativeOptimizations
    PRIVATE Console
    PRIVATE Window
    PRIVATE ScriptLoader
    PRIVATE XMLHttpRequest
    PRIVATE Canvas
    PRIVATE glfw
    PRIVATE GraphicsDevice)

target_compile_features(${CMAKE_PROJECT_NAME} PRIVATE cxx_std_17)

# Set bundle.js to be copied to the build folder.
if(EXISTS "${CMAKE_CURRENT_SOURCE_DIR}/TypeScript/build/bundle.js")
    set(SCRIPT "${CMAKE_CURRENT_SOURCE_DIR}/TypeScript/build/bundle.js")
    target_sources(${CMAKE_PROJECT_NAME} PRIVATE ${SCRIPT})

    get_filename_component(SCRIPT_NAME "${SCRIPT}" NAME)

    add_custom_command(
        OUTPUT "${CMAKE_CFG_INTDIR}/Scripts/${SCRIPT_NAME}"
        COMMAND "${CMAKE_COMMAND}" -E copy "${SCRIPT}" "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_CFG_INTDIR}/Scripts/${SCRIPT_NAME}"
        COMMENT "Copying ${SCRIPT_NAME}"
        MAIN_DEPENDENCY "${SCRIPT}")
    
    source_group(TREE ${CMAKE_CURRENT_SOURCE_DIR} FILES ${SCRIPT})
else()
    message(FATAL_ERROR "Javascript bundle is required. Please run 'npm run build' from the TypeScript folder.")
endif()

set_property(DIRECTORY ${CMAKE_SOURCE_DIR} PROPERTY VS_STARTUP_PROJECT ${CMAKE_PROJECT_NAME})

if(MSVC)
    target_compile_definitions(${CMAKE_PROJECT_NAME} PRIVATE TARGET_PLATFORM_WINDOWS)
elseif(APPLE)
    target_compile_definitions(${CMAKE_PROJECT_NAME} PRIVATE TARGET_PLATFORM_OSX)
    find_library(JSCORE_LIBRARY JavaScriptCore)
    target_link_libraries(${CMAKE_PROJECT_NAME} PRIVATE ${JSCORE_LIBRARY})
    target_link_libraries(${CMAKE_PROJECT_NAME} PRIVATE "-framework Cocoa" "-framework MetalKit" "-framework QuartzCore" "-framework CoreFoundation" "-framework CoreGraphics")
else()
    target_compile_definitions(${CMAKE_PROJECT_NAME} PRIVATE TARGET_PLATFORM_LINUX)
endif()