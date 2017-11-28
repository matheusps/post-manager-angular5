import { Component, OnDestroy, AfterViewInit, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements AfterViewInit, OnDestroy, OnChanges {

  @Input() elementId: String;
  @Input() value: any = "";
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;
  didSetValue: boolean = false;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table'],
      skin_url: '/assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnChanges(){
    if(!isNullOrUndefined(this.editor) && this.value !== "" && !this.didSetValue){
      this.didSetValue = true;
      this.editor.setContent(this.value);
    }
  }
  
  
  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}
