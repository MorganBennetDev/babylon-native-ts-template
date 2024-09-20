set(Scripts "${CMAKE_SOURCE_DIR}/typescript")

add_custom_target(Webpack ALL
    COMMAND npm run build
    WORKING_DIRECTORY "${Scripts}"
)