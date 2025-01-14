package browser

/*
#cgo CFLAGS: -x objective-c
#cgo LDFLAGS: -framework Cocoa
#include <stdlib.h>
const char* resolveBundleId(const char* appName);
const char* resolveAppPath(const char* appName);
*/
import "C"
import (
	"fmt"
	"log"
	"os/exec"
	"unsafe"
)

type BrowserConfig struct {
	Name             string   `json:"name"`
	AppType          string   `json:"appType"`
	OpenInBackground bool     `json:"openInBackground"`
	Profile          string   `json:"profile"`
	Args             []string `json:"args"`
	URL              string   `json:"url"`
}

func LaunchBrowser(config BrowserConfig) error {
	log.Printf("Starting browser %s for URL %s", config.Name, config.URL)

	appName := config.Name
	useBundle := true
	if config.AppType == "name" {
		cName := C.CString(config.Name)
		defer C.free(unsafe.Pointer(cName))

		if cBundleId := C.resolveBundleId(cName); cBundleId != nil {
			defer C.free(unsafe.Pointer(cBundleId))
			bundleId := C.GoString(cBundleId)
			log.Printf("Resolved bundle id for %s: %s", config.Name, bundleId)
			appName = bundleId
		} else if cPath := C.resolveAppPath(cName); cPath != nil {
			defer C.free(unsafe.Pointer(cPath))
			path := C.GoString(cPath)
			log.Printf("Using app path for %s: %s", config.Name, path)
			appName = path
			useBundle = false
		} else {
			log.Printf("Could not resolve app %s, using name as-is", config.Name)
		}
	}

	args := append([]string{}, config.Args...)
	if config.Profile != "" {
		args = append(args, fmt.Sprintf("--profile=%s", config.Profile))
	}
	args = append(args, config.URL)

	openArgs := []string{"-a"}
	if useBundle {
		openArgs = []string{"-b"}
	}
	cmd := exec.Command("open", append(openArgs, appName)...)
	cmd.Args = append(cmd.Args, args...)

	log.Printf("Executing command: %v", cmd)
	return cmd.Start()
}
