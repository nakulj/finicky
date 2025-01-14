// browse.h
#import <Cocoa/Cocoa.h>
#include <syslog.h>

#ifndef MAIN_H
#define MAIN_H

extern void HandleURL(char* url, char* name, char* bundleID, char* path, int pid);

@interface BrowseAppDelegate: NSObject<NSApplicationDelegate>
    - (void)handleGetURLEvent:(NSAppleEventDescriptor *) event withReplyEvent:(NSAppleEventDescriptor *)replyEvent;
@end

void RunApp();

#endif /* MAIN_H */
