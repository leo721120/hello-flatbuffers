import { flatbuffers } from 'flatbuffers'
import { Hello } from './data_generated'

Promise.resolve().then(() => {
    const builder = new flatbuffers.Builder();
    const id = builder.createString("fjl2ijfdj");
    const type = builder.createString("test");
    const data = Hello.Message.createDataVector(builder, [8, 9, 10]);
    Hello.Message.startMessage(builder);
    Hello.Message.addId(builder, id);
    Hello.Message.addTimestamp(builder, new Date().getTime());
    Hello.Message.addType(builder, type);
    Hello.Message.addData(builder, data);
    const offset = Hello.Message.endMessage(builder);
    Hello.Message.finishMessageBuffer(builder, offset);
    const buf = builder.asUint8Array();
    console.info('buf', buf.length, buf);
    return buf;
}).then(function(buf) {
    const bb = new flatbuffers.ByteBuffer(buf);
    const message = Hello.Message.getRootAsMessage(bb);
    console.info('message', message);
    console.info(message.id(), message.timestamp(), message.type(), message.dataArray());
}).catch(console.error);