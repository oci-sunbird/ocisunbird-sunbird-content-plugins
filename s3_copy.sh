#!/bin/bash
declare -a coreplugins=("org.ekstep.activitybrowser-1.1"
                "org.ekstep.assessmentbrowser-1.0"
                "org.ekstep.collaborator-1.1"
                "org.ekstep.colorpicker-1.0"
                "org.ekstep.conceptselector-1.1"
                "org.ekstep.config-1.0"
                "org.ekstep.developer-1.0"
                "org.ekstep.download-1.1"
                "org.ekstep.hotspot-1.0"
                "org.ekstep.quiz-1.0"
                "org.ekstep.readalongbrowser-1.0"
                "org.ekstep.scribblepad-1.0"
                "org.ekstep.shape-1.0"
                "org.ekstep.stage-1.0"
                "org.ekstep.stageconfig-1.0"
                "org.ekstep.telemetry-1.0"
                "org.ekstep.templatebrowser-1.0"
                "org.ekstep.todo-1.1"
                "org.ekstep.unsupported-1.0"
                "org.ekstep.utils-1.0"
                "org.ekstep.viewecml-1.0"
                "org.ekstep.video-1.0"
                "org.ekstep.ceheader-1.0"
                "org.ekstep.review-1.1"
                "org.ekstep.keyboardshortcuts-1.0"
                "org.ekstep.collectioneditor-1.2"
                "org.ekstep.collectionheader-1.0"
                "org.ekstep.sunbirdcollectionheader-1.0"
                "org.ekstep.contenteditorfunctions-1.1"
                "org.ekstep.genericeditorheader-1.0"
                "org.ekstep.genericeditor-1.0"
                "org.ekstep.genericeditorsidebar-1.0"
                "org.ekstep.uploadcontent-1.0"
                "org.ekstep.richtext-1.0"
                "org.ekstep.image-1.1"
                "org.ekstep.assetbrowser-1.1"
                "org.ekstep.preview-1.1"
                "org.ekstep.text-1.1"
                "org.ekstep.wordinfobrowser-1.1"
                "org.ekstep.textbookmeta-1.3"
                "org.ekstep.textbookmeta-1.2"
                "org.ekstep.lessonbrowser-1.2"
                "org.ekstep.lessonbrowser-1.3"
                "org.ekstep.unitmeta-1.3"
                "org.ekstep.contentmeta-1.3"
                "org.ekstep.coursemeta-1.3"
                "org.ekstep.courseunitmeta-1.3"
                "org.ekstep.lessonplanmeta-1.3"
                "org.ekstep.lessonplanunitmeta-1.3"
                "org.ekstep.unitmeta-1.2"
                "org.ekstep.contentmeta-1.2"
                "org.ekstep.coursemeta-1.2"
                "org.ekstep.courseunitmeta-1.2"
                "org.ekstep.lessonplanmeta-1.2"
                "org.ekstep.lessonplanunitmeta-1.2"
                "org.ekstep.genericeditorpreview-1.1"
                "org.ekstep.editcontentmeta-1.2"
                "org.ekstep.sunbirdcommonheader-1.1"
                "org.ekstep.audio-1.1"
                "org.ekstep.collectionwhatsnew-1.0"
                "org.ekstep.suggestcontent-1.0"
                "org.ekstep.iterator-1.0"
                "org.ekstep.navigation-1.0"
                "org.ekstep.breadcrumb-1.0"
                "org.ekstep.questionset-1.0"
                "org.ekstep.questionset.preview-1.0"
                "org.ekstep.questionset.quiz-1.0");

for i in "${coreplugins[@]}"
do
   aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/$i/ --recursive
   aws s3 --region ap-south-1 cp ansible/content-plugins/$i s3://ekstep-public-$1/content-plugins/$i --recursive --acl public-read
done

